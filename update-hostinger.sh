#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# Urban Kitchen — Hostinger VPS Update Script
# ═══════════════════════════════════════════════════════════════════
#
# Usage:
#   chmod +x update-hostinger.sh
#   ./update-hostinger.sh                     # Build locally, then deploy
#   ./update-hostinger.sh --skip-build        # Skip build, deploy existing
#   ./update-hostinger.sh --build-only        # Only build, don't deploy
#   ./update-hostinger.sh --source /path      # Build from custom source path
#
# This script updates the production deployment at /var/www/urban-kitchens
# by copying new files from the standalone build output.
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

# ── Colors ──────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# ── Configuration ───────────────────────────────────────────────────
APP_DIR="/var/www/urban-kitchens"
LOG_DIR="/var/log/urban-kitchens"
BACKUP_DIR="/var/www/backups"
DB_FILE="custom.db"
SOURCE_DIR=""      # Custom source directory (optional)
SKIP_BUILD=false
BUILD_ONLY=false

# ── Parse Arguments ─────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case $1 in
    --skip-build)
      SKIP_BUILD=true
      shift
      ;;
    --build-only)
      BUILD_ONLY=true
      shift
      ;;
    --source)
      SOURCE_DIR="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --skip-build       Skip the build step, deploy existing build"
      echo "  --build-only       Only build, don't deploy"
      echo "  --source PATH      Build from custom source directory"
      echo "  --help             Show this help message"
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

# Determine source directory
if [[ -n "${SOURCE_DIR}" ]]; then
  cd "${SOURCE_DIR}"
fi

PROJECT_DIR="$(pwd)"

# ── Helper Functions ────────────────────────────────────────────────
success() { echo -e "  ${GREEN}✅ $1${NC}"; }
warning() { echo -e "  ${YELLOW}⚠️  $1${NC}"; }
error()   { echo -e "  ${RED}❌ $1${NC}"; }
info()    { echo -e "  ${CYAN}ℹ️  $1${NC}"; }

# ── Pre-flight Checks ──────────────────────────────────────────────
preflight() {
  echo ""
  echo -e "${CYAN}╔══════════════════════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}║${NC}  ${BOLD}🔄  Urban Kitchen — Update Deployment${NC}                    ${CYAN}║${NC}"
  echo -e "${CYAN}╚══════════════════════════════════════════════════════════╝${NC}"
  echo ""

  # If deploying, check target directory
  if [[ "${BUILD_ONLY}" == "false" ]]; then
    if [[ ! -d "${APP_DIR}" ]]; then
      error "Deployment directory ${APP_DIR} does not exist."
      echo -e "  Run ${BOLD}sudo ./deploy-hostinger.sh${NC} first for initial deployment."
      exit 1
    fi

    if [[ ! -f "${APP_DIR}/.env" ]]; then
      warning "No .env file found in deployment directory"
    fi
  fi
}

# ── Step 1: Build ──────────────────────────────────────────────────
build_project() {
  echo ""
  echo -e "${BLUE}┌──────────────────────────────────────────────────────────┐${NC}"
  echo -e "${BLUE}│${NC} ${BOLD}Step 1/4:${NC} Building Production Bundle"
  echo -e "${BLUE}└──────────────────────────────────────────────────────────┘${NC}"

  if [[ "${SKIP_BUILD}" == "true" ]]; then
    if [[ -d "${PROJECT_DIR}/.next/standalone" ]]; then
      info "Skipping build — using existing standalone output"
      success "Existing build found at .next/standalone/"
    else
      error "No existing build found. Cannot skip build."
      echo -e "  Run ${BOLD}./update-hostinger.sh${NC} without --skip-build"
      exit 1
    fi
    return
  fi

  info "Installing dependencies..."
  npm install --quiet 2>&1 | tail -3

  info "Generating Prisma Client..."
  npx prisma generate

  info "Building Next.js standalone output..."
  npm run build

  if [[ -d "${PROJECT_DIR}/.next/standalone" ]]; then
    success "Build complete — standalone output ready"
  else
    error "Build failed — standalone output not found"
    exit 1
  fi

  if [[ "${BUILD_ONLY}" == "true" ]]; then
    success "Build-only mode — skipping deployment"
    exit 0
  fi
}

# ── Step 2: Backup & Deploy Files ──────────────────────────────────
deploy_files() {
  echo ""
  echo -e "${BLUE}┌──────────────────────────────────────────────────────────┐${NC}"
  echo -e "${BLUE}│${NC} ${BOLD}Step 2/4:${NC} Deploying Updated Files"
  echo -e "${BLUE}└──────────────────────────────────────────────────────────┘${NC}"

  # Create timestamped backup
  local backup_name="urban-kitchens-$(date +%Y%m%d-%H%M%S)"
  mkdir -p "${BACKUP_DIR}"

  info "Creating backup: ${backup_name}"
  # Only backup critical files (not node_modules or .next)
  mkdir -p "${BACKUP_DIR}/${backup_name}"
  cp -r "${APP_DIR}/public" "${BACKUP_DIR}/${backup_name}/" 2>/dev/null || true
  cp -r "${APP_DIR}/prisma" "${BACKUP_DIR}/${backup_name}/" 2>/dev/null || true
  cp "${APP_DIR}/.env" "${BACKUP_DIR}/${backup_name}/" 2>/dev/null || true
  cp "${APP_DIR}/ecosystem.config.js" "${BACKUP_DIR}/${backup_name}/" 2>/dev/null || true

  success "Backup created"

  # Copy standalone build output (overwrites server files)
  info "Copying standalone build..."
  cp -r "${PROJECT_DIR}/.next/standalone/." "${APP_DIR}/"

  # Copy static assets (standalone doesn't include these)
  info "Copying .next/static assets..."
  mkdir -p "${APP_DIR}/.next/static"
  cp -r "${PROJECT_DIR}/.next/static/." "${APP_DIR}/.next/static/" 2>/dev/null || true

  # Copy public folder (images, uploads, etc.)
  info "Copying public assets..."
  cp -r "${PROJECT_DIR}/public/." "${APP_DIR}/public/" 2>/dev/null || true

  # Copy updated Prisma schema (in case of schema changes)
  info "Copying Prisma schema..."
  mkdir -p "${APP_DIR}/prisma"
  cp "${PROJECT_DIR}/prisma/schema.prisma" "${APP_DIR}/prisma/"

  # Copy updated ecosystem config
  info "Copying PM2 ecosystem config..."
  cp "${PROJECT_DIR}/ecosystem.config.js" "${APP_DIR}/"

  # Preserve .env (do NOT overwrite production .env)
  if [[ ! -f "${APP_DIR}/.env" ]]; then
    warning "No .env found in deployment! Creating from .env.example..."
    if [[ -f "${PROJECT_DIR}/.env.example" ]]; then
      cp "${PROJECT_DIR}/.env.example" "${APP_DIR}/.env"
    fi
    error "Edit ${APP_DIR}/.env with production values!"
  else
    info "Preserving existing .env (not overwritten)"
  fi

  success "Files deployed"
}

# ── Step 3: Update Dependencies & Database ─────────────────────────
update_deps_and_db() {
  echo ""
  echo -e "${BLUE}┌──────────────────────────────────────────────────────────┐${NC}"
  echo -e "${BLUE}│${NC} ${BOLD}Step 3/4:${NC} Updating Dependencies & Database"
  echo -e "${BLUE}└──────────────────────────────────────────────────────────┘${NC}"

  cd "${APP_DIR}"

  # Install/update production dependencies
  info "Installing production dependencies..."
  npm install --omit=dev --ignore-scripts 2>&1 | tail -5

  success "Dependencies updated"

  # Generate Prisma Client (in case schema changed)
  info "Generating Prisma Client..."
  npx prisma generate

  success "Prisma Client generated"

  # Push schema changes (if any)
  info "Pushing database schema changes..."
  npx prisma db push --skip-generate

  success "Database schema is up to date"
}

# ── Step 4: Restart Application ────────────────────────────────────
restart_app() {
  echo ""
  echo -e "${BLUE}┌──────────────────────────────────────────────────────────┐${NC}"
  echo -e "${BLUE}│${NC} ${BOLD}Step 4/4:${NC} Restarting Application"
  echo -e "${BLUE}└──────────────────────────────────────────────────────────┘${NC}"

  # Clear Next.js cache
  info "Clearing .next cache..."
  rm -rf "${APP_DIR}/.next/cache" 2>/dev/null || true

  # Restart PM2
  info "Restarting PM2 process..."
  pm2 restart urban-kitchens

  # Wait and verify
  sleep 3

  if pm2 pid urban-kitchens &>/dev/null; then
    success "Application restarted successfully"
    pm2 status urban-kitchens
  else
    error "Application failed to start! Check logs:"
    pm2 logs urban-kitchens --lines 30
    exit 1
  fi

  # Quick health check
  info "Running health check..."
  sleep 2
  local http_code
  http_code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")
  if [[ "${http_code}" =~ ^(200|302)$ ]]; then
    success "Application is healthy (HTTP ${http_code})"
  else
    warning "Application returned HTTP ${http_code} — may need a moment to start"
    info "Check with: pm2 logs urban-kitchens"
  fi
}

# ── Summary ────────────────────────────────────────────────────────
print_summary() {
  echo ""
  echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║${NC}  ${BOLD}🎉 Update Complete!${NC}                                       ${GREEN}║${NC}"
  echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
  echo ""
  echo -e "  ${BOLD}Quick Commands:${NC}"
  echo -e "    ${BOLD}pm2 logs urban-kitchens${NC}        — View live logs"
  echo -e "    ${BOLD}pm2 restart urban-kitchens${NC}     — Restart again"
  echo -e "    ${BOLD}pm2 monit${NC}                     — Monitor resources"
  echo -e "    ${BOLD}curl -I http://localhost:3000${NC}  — Health check"
  echo ""
  echo -e "  ${BOLD}Rollback (if needed):${NC}"
  echo -e "    Backups are in: ${BACKUP_DIR}/"
  echo -e "    ls ${BACKUP_DIR}/"
  echo -e "    cp -r ${BACKUP_DIR}/<timestamp>/* ${APP_DIR}/"
  echo -e "    pm2 restart urban-kitchens"
  echo ""
}

# ── Main ────────────────────────────────────────────────────────────
main() {
  preflight
  build_project
  deploy_files
  update_deps_and_db
  restart_app
  print_summary
}

main
