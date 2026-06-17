#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# Urban Kitchen — Hostinger VPS Deployment Script
# ═══════════════════════════════════════════════════════════════════
#
# Usage:
#   chmod +x deploy-hostinger.sh
#   sudo ./deploy-hostinger.sh
#
# This script must be run from the project root directory
# where the .next/standalone build output exists.
#
# Prerequisites:
#   - Ubuntu 22.04 LTS VPS (Hostinger or similar)
#   - Root or sudo access
#   - Domain DNS pointed to this server's IP
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

# ── Colors ──────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ── Configuration ───────────────────────────────────────────────────
APP_DIR="/var/www/urban-kitchens"
APP_USER="www-data"
NODE_VERSION="20"
LOG_DIR="/var/log/urban-kitchens"
BACKUP_DIR="/var/www/backups"
DB_FILE="custom.db"
DOMAIN=""  # Will prompt if not set

# ── Helper Functions ────────────────────────────────────────────────
print_banner() {
  echo ""
  echo -e "${CYAN}╔══════════════════════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}║                                                          ║${NC}"
  echo -e "${CYAN}║${NC}  ${BOLD}🍽️  Urban Kitchen — Hostinger VPS Deployment${NC}            ${CYAN}║${NC}"
  echo -e "${CYAN}║                                                          ║${NC}"
  echo -e "${CYAN}╚══════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

step_header() {
  local step_num=$1
  local step_total=$2
  local step_desc=$3
  echo ""
  echo -e "${BLUE}┌──────────────────────────────────────────────────────────┐${NC}"
  echo -e "${BLUE}│${NC} ${BOLD}Step ${step_num}/${step_total}:${NC} ${step_desc}"
  echo -e "${BLUE}└──────────────────────────────────────────────────────────┘${NC}"
}

success() {
  echo -e "  ${GREEN}✅ $1${NC}"
}

warning() {
  echo -e "  ${YELLOW}⚠️  $1${NC}"
}

error() {
  echo -e "  ${RED}❌ $1${NC}"
}

info() {
  echo -e "  ${CYAN}ℹ️  $1${NC}"
}

check_command() {
  if command -v "$1" &> /dev/null; then
    return 0
  else
    return 1
  fi
}

# ── Pre-flight Checks ──────────────────────────────────────────────
preflight_checks() {
  print_banner

  # Check if running as root or with sudo
  if [[ $EUID -ne 0 ]]; then
    error "This script must be run as root or with sudo."
    echo -e "  Usage: sudo ./deploy-hostinger.sh"
    exit 1
  fi

  # Check if standalone build exists
  if [[ ! -d ".next/standalone" ]]; then
    error "Standalone build not found at .next/standalone/"
    echo -e "  Run ${BOLD}npm run build${NC} first, then re-run this script."
    exit 1
  fi

  # Check if prisma schema exists
  if [[ ! -f "prisma/schema.prisma" ]]; then
    error "Prisma schema not found at prisma/schema.prisma"
    exit 1
  fi

  # Check if ecosystem.config.js exists
  if [[ ! -f "ecosystem.config.js" ]]; then
    error "ecosystem.config.js not found"
    exit 1
  fi

  success "Pre-flight checks passed"
}

# ── Step 1: Install System Dependencies ────────────────────────────
install_dependencies() {
  step_header 1 9 "Installing System Dependencies"

  # Update package lists
  info "Updating package lists..."
  apt-get update -qq

  # Install essential packages
  info "Installing curl, git, build-essential, nginx, certbot..."
  apt-get install -y -qq \
    curl \
    git \
    build-essential \
    nginx \
    certbot \
    python3-certbot-nginx \
    ufw \
    > /dev/null 2>&1

  success "System dependencies installed"
}

# ── Step 2: Install Node.js ────────────────────────────────────────
install_nodejs() {
  step_header 2 9 "Installing Node.js ${NODE_VERSION}"

  if check_command node; then
    local current_version=$(node -v)
    info "Node.js already installed: ${current_version}"

    # Check if version is 18+
    if [[ "${current_version}" == v1[0-7]* ]]; then
      warning "Node.js version too old. Upgrading to v${NODE_VERSION}..."
      curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | bash -
      apt-get install -y nodejs
    fi
  else
    info "Installing Node.js v${NODE_VERSION}..."
    curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | bash -
    apt-get install -y -qq nodejs
  fi

  echo -e "  Node.js: ${BOLD}$(node -v)${NC}"
  echo -e "  npm:     ${BOLD}$(npm -v)${NC}"
  success "Node.js ready"
}

# ── Step 3: Install PM2 ───────────────────────────────────────────
install_pm2() {
  step_header 3 9 "Installing PM2 Process Manager"

  if check_command pm2; then
    info "PM2 already installed: $(pm2 -v)"
  else
    info "Installing PM2 globally..."
    npm install -g pm2
  fi

  success "PM2 ready ($(pm2 -v))"
}

# ── Step 4: Setup Application Directory ────────────────────────────
setup_directory() {
  step_header 4 9 "Setting Up Application Directory"

  # Create backup of existing deployment if it exists
  if [[ -d "${APP_DIR}" ]]; then
    warning "Existing deployment found at ${APP_DIR}"
    info "Creating backup..."

    mkdir -p "${BACKUP_DIR}"
    local backup_name="urban-kitchens-$(date +%Y%m%d-%H%M%S)"
    cp -r "${APP_DIR}" "${BACKUP_DIR}/${backup_name}"

    success "Backup created: ${BACKUP_DIR}/${backup_name}"

    # Remove old deployment (keep .env and db)
    if [[ -f "${APP_DIR}/.env" ]]; then
      cp "${APP_DIR}/.env" "/tmp/urban-kitchens-env-backup"
      info "Existing .env backed up to /tmp/urban-kitchens-env-backup"
    fi
    if [[ -f "${APP_DIR}/db/${DB_FILE}" ]]; then
      cp "${APP_DIR}/db/${DB_FILE}" "/tmp/urban-kitchens-db-backup"
      info "Existing database backed up to /tmp/urban-kitchens-db-backup"
    fi

    rm -rf "${APP_DIR}"
  fi

  # Create fresh directory structure
  mkdir -p "${APP_DIR}"
  mkdir -p "${APP_DIR}/db"
  mkdir -p "${APP_DIR}/prisma"
  mkdir -p "${APP_DIR}/public"
  mkdir -p "${LOG_DIR}"

  success "Directory structure created at ${APP_DIR}"
}

# ── Step 5: Copy Application Files ─────────────────────────────────
copy_files() {
  step_header 5 9 "Deploying Application Files"

  # Copy standalone build output
  info "Copying standalone build..."
  cp -r .next/standalone/* "${APP_DIR}/"

  # Copy static files (standalone doesn't include these)
  info "Copying .next/static assets..."
  mkdir -p "${APP_DIR}/.next/static"
  cp -r .next/static/* "${APP_DIR}/.next/static/" 2>/dev/null || true

  # Copy public folder (images, uploads, etc.)
  info "Copying public assets..."
  cp -r public/* "${APP_DIR}/public/" 2>/dev/null || true

  # Copy Prisma schema
  info "Copying Prisma schema..."
  cp prisma/schema.prisma "${APP_DIR}/prisma/"

  # Copy ecosystem config
  info "Copying PM2 ecosystem config..."
  cp ecosystem.config.js "${APP_DIR}/"

  # Copy nginx config
  if [[ -f "nginx.conf" ]]; then
    info "Copying Nginx config template..."
    cp nginx.conf "${APP_DIR}/"
  fi

  # Copy .env.example
  if [[ -f ".env.example" ]]; then
    cp .env.example "${APP_DIR}/"
  fi

  # Create or restore .env
  if [[ -f "/tmp/urban-kitchens-env-backup" ]]; then
    info "Restoring existing .env..."
    cp "/tmp/urban-kitchens-env-backup" "${APP_DIR}/.env"
    rm -f "/tmp/urban-kitchens-env-backup"
  elif [[ -f ".env" ]]; then
    info "Copying .env from project..."
    cp .env "${APP_DIR}/"
  else
    warning "No .env file found! Creating from .env.example..."
    if [[ -f ".env.example" ]]; then
      cp .env.example "${APP_DIR}/.env"
    else
      # Create minimal .env
      cat > "${APP_DIR}/.env" << 'ENVEOF'
DATABASE_URL=file:./db/custom.db
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
ENVEOF
    fi
    error "IMPORTANT: Edit ${APP_DIR}/.env with your production values!"
  fi

  # Restore database if it existed
  if [[ -f "/tmp/urban-kitchens-db-backup" ]]; then
    info "Restoring existing database..."
    cp "/tmp/urban-kitchens-db-backup" "${APP_DIR}/db/${DB_FILE}"
    rm -f "/tmp/urban-kitchens-db-backup"
    success "Existing database restored"
  fi

  # Ensure DATABASE_URL uses relative path
  if grep -q "^DATABASE_URL=file:/" "${APP_DIR}/.env" 2>/dev/null; then
    warning "DATABASE_URL in .env uses absolute path. Fixing to relative path..."
    sed -i 's|^DATABASE_URL=file:.*|DATABASE_URL=file:./db/custom.db|' "${APP_DIR}/.env"
    success "DATABASE_URL updated to relative path"
  fi

  success "All application files deployed"
}

# ── Step 6: Install Production Dependencies ────────────────────────
install_prod_deps() {
  step_header 6 9 "Installing Production Dependencies"

  cd "${APP_DIR}"

  info "Installing production Node.js packages..."
  npm install --omit=dev --ignore-scripts 2>&1 | tail -5

  success "Production dependencies installed"
}

# ── Step 7: Generate Prisma Client & Push Schema ───────────────────
setup_database() {
  step_header 7 9 "Setting Up Database"

  cd "${APP_DIR}"

  # Generate Prisma Client
  info "Generating Prisma Client..."
  npx prisma generate

  success "Prisma Client generated"

  # Push database schema
  info "Pushing database schema..."
  npx prisma db push --skip-generate

  success "Database schema applied"

  # Seed database if no existing data
  if [[ ! -f "${APP_DIR}/db/${DB_FILE}" ]] || [[ ! -s "${APP_DIR}/db/${DB_FILE}" ]]; then
    info "Seeding database with initial data..."
    # Start the app temporarily to seed via API
    warning "Database is empty. You will need to seed it after PM2 starts."
    info "Run: curl -X POST http://localhost:3000/api/seed"
  else
    info "Database already has data. Skipping seed."
  fi

  success "Database setup complete"
}

# ── Step 8: Start with PM2 ─────────────────────────────────────────
start_pm2() {
  step_header 8 9 "Starting Application with PM2"

  cd "${APP_DIR}"

  # Set proper ownership
  chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}"
  chown -R "${APP_USER}:${APP_USER}" "${LOG_DIR}"

  # Stop existing PM2 process if any
  pm2 delete urban-kitchens 2>/dev/null || true

  # Start the application
  info "Starting urban-kitchens with PM2..."
  pm2 start ecosystem.config.js

  # Save PM2 process list
  pm2 save

  # Configure PM2 to start on system boot
  info "Configuring PM2 startup on boot..."
  pm2 startup systemd -u root --hp /root 2>/dev/null || true

  # Wait and check if app started successfully
  sleep 3
  if pm2 pid urban-kitchens &>/dev/null; then
    success "Application started successfully"
    pm2 status urban-kitchens
  else
    error "Application failed to start! Check logs:"
    pm2 logs urban-kitchens --lines 20
    exit 1
  fi

  # Test if the app responds
  info "Testing application response..."
  sleep 2
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -qE "200|302"; then
    success "Application is responding on port 3000"
  else
    warning "Application may not be ready yet. Check: pm2 logs urban-kitchens"
  fi
}

# ── Step 9: Configure Nginx ────────────────────────────────────────
configure_nginx() {
  step_header 9 9 "Configuring Nginx Reverse Proxy"

  # Ask for domain
  echo -ne "  ${YELLOW}Enter your domain name (e.g., urbankitchens.com): ${NC}"
  read -r DOMAIN

  if [[ -z "${DOMAIN}" ]]; then
    warning "No domain provided. Using server IP for Nginx config."
    DOMAIN="yourdomain.com"
  fi

  # Create Nginx config if template doesn't exist
  if [[ -f "${APP_DIR}/nginx.conf" ]]; then
    # Copy the template and replace domain
    cp "${APP_DIR}/nginx.conf" /etc/nginx/sites-available/urban-kitchens
    sed -i "s/yourdomain.com/${DOMAIN}/g" /etc/nginx/sites-available/urban-kitchens
    sed -i "s/www\.yourdomain\.com/www.${DOMAIN}/g" /etc/nginx/sites-available/urban-kitchens
  else
    # Create a basic Nginx config
    cat > /etc/nginx/sites-available/urban-kitchens << NGINXEOF
# Urban Kitchen - Nginx Configuration
# Auto-generated by deploy-hostinger.sh

# Rate limiting zones
limit_req_zone \$binary_remote_addr zone=api:10m rate=30r/m;
limit_req_zone \$binary_remote_addr zone=general:10m rate=60r/m;

# HTTP -> HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

# HTTPS server (SSL certs will be added by certbot)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${DOMAIN} www.${DOMAIN};

    # Placeholder SSL — will be replaced by certbot
    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    # SSL hardening
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logs
    access_log /var/log/nginx/urban-kitchens-access.log;
    error_log /var/log/nginx/urban-kitchens-error.log;

    # Max upload size
    client_max_body_size 20M;

    # Next.js standalone server
    location / {
        limit_req zone=general burst=20 nodelay;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    # API routes with stricter rate limiting
    location /api/ {
        limit_req zone=api burst=10 nodelay;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 30s;
    }

    # Static files with long caching
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Block sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    location ~ \.(env|git|md)$ {
        deny all;
        access_log off;
        log_not_found off;
    }
}
NGINXEOF
  fi

  # Enable the site
  ln -sf /etc/nginx/sites-available/urban-kitchens /etc/nginx/sites-enabled/
  rm -f /etc/nginx/sites-enabled/default

  # Create certbot directory
  mkdir -p /var/www/certbot

  # Test Nginx config
  info "Testing Nginx configuration..."
  if nginx -t 2>/dev/null; then
    success "Nginx configuration is valid"
    systemctl reload nginx
    success "Nginx reloaded"
  else
    error "Nginx configuration has errors!"
    nginx -t
    warning "Fix the config at /etc/nginx/sites-available/urban-kitchens"
  fi
}

# ── Final Summary ──────────────────────────────────────────────────
print_summary() {
  echo ""
  echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║                                                          ║${NC}"
  echo -e "${GREEN}║${NC}  ${BOLD}🎉 Deployment Complete!${NC}                                   ${GREEN}║${NC}"
  echo -e "${GREEN}║                                                          ║${NC}"
  echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
  echo ""
  echo -e "${BOLD}Next Steps:${NC}"
  echo ""
  echo -e "  ${CYAN}1.${NC} Verify the app is running:"
  echo -e "     ${BOLD}pm2 status${NC}"
  echo -e "     ${BOLD}pm2 logs urban-kitchens${NC}"
  echo ""
  echo -e "  ${CYAN}2.${NC} Seed the database (first time only):"
  echo -e "     ${BOLD}curl -X POST http://localhost:3000/api/seed${NC}"
  echo ""
  echo -e "  ${CYAN}3.${NC} Review your environment config:"
  echo -e "     ${BOLD}nano ${APP_DIR}/.env${NC}"
  echo ""
  if [[ "${DOMAIN}" != "yourdomain.com" ]]; then
    echo -e "  ${CYAN}4.${NC} Get SSL certificate:"
    echo -e "     ${BOLD}sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}${NC}"
    echo ""
    echo -e "  ${CYAN}5.${NC} Verify auto-renewal:"
    echo -e "     ${BOLD}sudo certbot renew --dry-run${NC}"
    echo ""
  else
    echo -e "  ${CYAN}4.${NC} Update Nginx with your domain:"
    echo -e "     ${BOLD}sudo nano /etc/nginx/sites-available/urban-kitchens${NC}"
    echo -e "     Replace 'yourdomain.com' with your actual domain"
    echo ""
    echo -e "  ${CYAN}5.${NC} Get SSL certificate:"
    echo -e "     ${BOLD}sudo certbot --nginx -d YOURDOMAIN -d www.YOURDOMAIN${NC}"
    echo ""
  fi
  echo -e "  ${CYAN}6.${NC} Setup firewall (recommended):"
  echo -e "     ${BOLD}sudo ufw allow OpenSSH${NC}"
  echo -e "     ${BOLD}sudo ufw allow 'Nginx Full'${NC}"
  echo -e "     ${BOLD}sudo ufw enable${NC}"
  echo ""
  echo -e "${BOLD}Admin Login:${NC}"
  echo -e "  Email:    ${BOLD}admin@urbankitchens.com${NC}"
  echo -e "  Password: ${BOLD}admin123${NC}"
  echo -e "  ${RED}⚠ Change this password immediately after first login!${NC}"
  echo ""
  echo -e "${BOLD}Useful Commands:${NC}"
  echo -e "  ${BOLD}pm2 status${NC}                     — Check app status"
  echo -e "  ${BOLD}pm2 logs urban-kitchens${NC}         — View live logs"
  echo -e "  ${BOLD}pm2 restart urban-kitchens${NC}      — Restart the app"
  echo -e "  ${BOLD}pm2 monit${NC}                      — Monitor resources"
  echo -e "  ${BOLD}sudo nginx -t && sudo systemctl reload nginx${NC}  — Reload Nginx"
  echo ""
  echo -e "${BOLD}File Locations:${NC}"
  echo -e "  App:      ${APP_DIR}"
  echo -e "  Config:   ${APP_DIR}/.env"
  echo -e "  Database: ${APP_DIR}/db/${DB_FILE}"
  echo -e "  Logs:     ${LOG_DIR}/"
  echo -e "  Nginx:    /etc/nginx/sites-available/urban-kitchens"
  echo -e "  Backups:  ${BACKUP_DIR}/"
  echo ""
}

# ── Main Execution ─────────────────────────────────────────────────
main() {
  preflight_checks
  install_dependencies
  install_nodejs
  install_pm2
  setup_directory
  copy_files
  install_prod_deps
  setup_database
  start_pm2
  configure_nginx
  print_summary
}

# Run
main
