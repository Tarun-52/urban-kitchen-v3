# Urban Kitchen — Hostinger VPS Deployment Guide

Complete step-by-step production deployment guide for Hostinger VPS with PM2, Nginx, and SSL.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Prepare the Deployment Package](#2-prepare-the-deployment-package)
3. [Upload to VPS](#3-upload-to-vps)
4. [Run the Deploy Script](#4-run-the-deploy-script)
5. [Configure Domain in Nginx](#5-configure-domain-in-nginx)
6. [Get SSL Certificate](#6-get-ssl-certificate)
7. [Verify Deployment](#7-verify-deployment)
8. [Admin Login Credentials](#8-admin-login-credentials)
9. [Common Maintenance Commands](#9-common-maintenance-commands)
10. [Updating the Application](#10-updating-the-application)
11. [Troubleshooting](#11-troubleshooting)
12. [Production File Structure](#12-production-file-structure)

---

## 1. Prerequisites

| Requirement | Details |
|---|---|
| **VPS** | Hostinger VPS with Ubuntu 22.04 LTS (or 20.04+) |
| **RAM** | Minimum 1 GB, Recommended 2 GB+ |
| **Storage** | Minimum 10 GB, Recommended 20 GB+ |
| **CPU** | Minimum 1 core, Recommended 2+ cores |
| **SSH Access** | Root or sudo user access |
| **Domain** | A domain name pointed to your VPS IP address |
| **DNS** | A record pointing `@` and `www` to your VPS IP |

### DNS Configuration (Hostinger Panel)

Before starting, configure DNS in your Hostinger panel:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | `your-vps-ip` | 3600 |
| A | www | `your-vps-ip` | 3600 |
| AAAA | @ | `your-vps-ipv6` (if available) | 3600 |

> Wait 5–30 minutes for DNS propagation before proceeding with SSL.

---

## 2. Prepare the Deployment Package

On your **local machine**, build the project:

```bash
# Clone or navigate to your project
cd urban-kitchen

# Install dependencies
npm install

# Build the standalone output
npm run build
```

This creates `.next/standalone/` which contains the minimal Node.js server.

### Create a deployment archive (optional):

```bash
# From the project root, create a tarball with all needed files
tar -czf urban-kitchen-deploy.tar.gz \
  .next/standalone/ \
  .next/static/ \
  public/ \
  prisma/schema.prisma \
  ecosystem.config.js \
  nginx.conf \
  .env.example \
  deploy-hostinger.sh \
  update-hostinger.sh \
  package.json
```

---

## 3. Upload to VPS

### Option A: SCP (Secure Copy)

```bash
# Upload the archive
scp urban-kitchen-deploy.tar.gz root@your-server-ip:/tmp/

# Or upload the entire project directory
scp -r ./urban-kitchen root@your-server-ip:/tmp/urban-kitchen
```

### Option B: Clone from Git

```bash
# SSH into your VPS
ssh root@your-server-ip

# Clone the repository
git clone https://github.com/your-org/urban-kitchen.git /tmp/urban-kitchen
cd /tmp/urban-kitchen

# Install and build
npm install
npm run build
```

### Option C: Using the Archive

```bash
ssh root@your-server-ip

cd /tmp
tar -xzf urban-kitchen-deploy.tar.gz
cd urban-kitchen  # or the extracted directory
```

---

## 4. Run the Deploy Script

```bash
# SSH into your VPS
ssh root@your-server-ip

# Navigate to the project (if not already there)
cd /tmp/urban-kitchen

# Make the script executable
chmod +x deploy-hostinger.sh

# Run the deployment script
sudo ./deploy-hostinger.sh
```

The script will:
1. Install system dependencies (Node.js 20, PM2, Nginx, Certbot)
2. Set up `/var/www/urban-kitchens` directory
3. Copy standalone build, public assets, Prisma schema
4. Install production dependencies
5. Generate Prisma Client & push database schema
6. Start the app with PM2
7. Configure Nginx reverse proxy
8. Prompt for your domain name

### After the script finishes:

**Seed the database (first time only):**

```bash
curl -X POST http://localhost:3000/api/seed
```

> This creates the admin user and sample product data.

**Review the environment config:**

```bash
nano /var/www/urban-kitchens/.env
```

Make sure `DATABASE_URL` is set correctly:

```env
DATABASE_URL=file:./db/custom.db
```

> **Important:** The `DATABASE_URL` must use a **relative path** (`file:./db/custom.db`), not an absolute path. The path is relative to the application directory (`/var/www/urban-kitchens/`).

---

## 5. Configure Domain in Nginx

The deploy script creates an Nginx config. Verify and edit it:

```bash
sudo nano /etc/nginx/sites-available/urban-kitchens
```

Make sure `server_name` uses your actual domain:

```nginx
server_name yourdomain.com www.yourdomain.com;
```

Test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### If you need to change the domain later:

```bash
# Edit the Nginx config
sudo nano /etc/nginx/sites-available/urban-kitchens

# Find and replace the domain
# server_name olddomain.com www.olddomain.com;
# → server_name newdomain.com www.newdomain.com;

# Also update SSL cert paths if SSL was already configured
# ssl_certificate /etc/letsencrypt/live/newdomain.com/fullchain.pem;
# ssl_certificate_key /etc/letsencrypt/live/newdomain.com/privkey.pem;

# Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

---

## 6. Get SSL Certificate

Once DNS has propagated and Nginx is configured:

```bash
# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# 1. Enter your email for renewal notifications
# 2. Agree to Terms of Service
# 3. Choose redirect HTTP → HTTPS (recommended)
```

### Verify auto-renewal:

```bash
sudo certbot renew --dry-run
```

> Certbot automatically sets up a cron job to renew certificates before expiry.

### Manual renewal (if needed):

```bash
sudo certbot renew
sudo systemctl reload nginx
```

---

## 7. Verify Deployment

Run these checks to confirm everything is working:

```bash
# 1. Check PM2 status
pm2 status

# 2. Check application logs
pm2 logs urban-kitchens --lines 20

# 3. Test local response
curl -I http://localhost:3000

# 4. Test via Nginx
curl -I http://yourdomain.com

# 5. Test HTTPS
curl -I https://yourdomain.com

# 6. Test API endpoint
curl https://yourdomain.com/api/health

# 7. Check Nginx status
sudo systemctl status nginx

# 8. Verify SSL certificate
echo | openssl s_client -connect yourdomain.com:443 -servername yourdomain.com 2>/dev/null | openssl x509 -noout -dates
```

### Browser Checks:

- [ ] Homepage loads at `https://yourdomain.com`
- [ ] Products page works
- [ ] Admin login page appears
- [ ] Images and static assets load (check browser dev tools for 404s)
- [ ] SSL padlock shows in browser
- [ ] Contact form submission works (if SMTP configured)

---

## 8. Admin Login Credentials

After seeding the database, use these credentials for the admin panel:

| Field | Value |
|---|---|
| **URL** | `https://yourdomain.com` (click Admin/Login) |
| **Email** | `admin@urbankitchens.com` |
| **Password** | `admin123` |

> **⚠️ CRITICAL: Change the admin password immediately after first login!**

### How to change the admin password:

1. Log in with the credentials above
2. Navigate to Settings or User Management in the admin panel
3. Update the password to a strong, unique one

---

## 9. Common Maintenance Commands

### PM2 Process Management

```bash
# Check application status
pm2 status

# View live logs
pm2 logs urban-kitchens

# View error logs only
pm2 logs urban-kitchens --err

# Restart the application
pm2 restart urban-kitchens

# Stop the application
pm2 stop urban-kitchens

# Start the application
pm2 start urban-kitchens

# Monitor CPU/Memory
pm2 monit

# View detailed process info
pm2 describe urban-kitchens

# Ensure PM2 starts on boot
pm2 startup
pm2 save
```

### Database Operations

```bash
cd /var/www/urban-kitchens

# Re-seed the database (overwrites with defaults)
curl -X POST http://localhost:3000/api/seed

# Push schema changes
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Backup the database
cp /var/www/urban-kitchens/db/custom.db /var/www/backups/custom-$(date +%Y%m%d-%H%M%S).db

# Restore from backup
cp /var/www/backups/custom-20250101-120000.db /var/www/urban-kitchens/db/custom.db
pm2 restart urban-kitchens
```

### Nginx Operations

```bash
# Test Nginx configuration
sudo nginx -t

# Reload Nginx (apply config changes)
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx

# View Nginx access logs
sudo tail -f /var/log/nginx/urban-kitchens-access.log

# View Nginx error logs
sudo tail -f /var/log/nginx/urban-kitchens-error.log
```

### SSL Certificate Management

```bash
# Renew certificate
sudo certbot renew

# Force renewal
sudo certbot renew --force-renewal

# Check certificate expiry
sudo certbot certificates

# Delete a certificate
sudo certbot delete --cert-name yourdomain.com
```

### Firewall (UFW)

```bash
# Check firewall status
sudo ufw status

# Allow SSH and HTTP/HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Disable firewall (not recommended)
sudo ufw disable
```

### System Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js (if needed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Update PM2
sudo npm install -g pm2@latest
```

---

## 10. Updating the Application

### Using the Update Script (Recommended)

```bash
cd /tmp/urban-kitchen  # or wherever your source code is

# Pull latest code (if using git)
git pull origin main

# Run the update script
chmod +x update-hostinger.sh
./update-hostinger.sh
```

### Update Script Options

```bash
# Full update: build + deploy
./update-hostinger.sh

# Skip build (use existing .next/standalone)
./update-hostinger.sh --skip-build

# Build only (don't deploy)
./update-hostinger.sh --build-only

# Build from a custom source directory
./update-hostinger.sh --source /home/user/urban-kitchen
```

### Manual Update (Step by Step)

```bash
# 1. Build locally or on server
cd /path/to/source
npm install
npm run build

# 2. Copy standalone build
cp -r .next/standalone/. /var/www/urban-kitchens/

# 3. Copy static assets
cp -r .next/static/. /var/www/urban-kitchens/.next/static/

# 4. Copy public assets
cp -r public/. /var/www/urban-kitchens/public/

# 5. Copy Prisma schema (if changed)
cp prisma/schema.prisma /var/www/urban-kitchens/prisma/

# 6. Update dependencies
cd /var/www/urban-kitchens
npm install --omit=dev

# 7. Generate Prisma Client & push schema changes
npx prisma generate
npx prisma db push

# 8. Restart the application
pm2 restart urban-kitchens
```

---

## 11. Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs urban-kitchens --lines 50

# Common issues:
# - Missing .env file → create one with DATABASE_URL
# - Port already in use → lsof -i :3000
# - Permission errors → chown -R www-data:www-data /var/www/urban-kitchens
```

### 502 Bad Gateway

```bash
# The Node.js app is not running or not reachable
pm2 status                    # Check if app is online
pm2 restart urban-kitchens    # Restart the app
curl http://localhost:3000    # Test direct connection
```

### Static Files Return 404

```bash
# Ensure .next/static and public directories exist
ls -la /var/www/urban-kitchens/.next/static/
ls -la /var/www/urban-kitchens/public/

# If missing, copy them again:
cp -r /path/to/source/.next/static/ /var/www/urban-kitchens/.next/static/
cp -r /path/to/source/public/ /var/www/urban-kitchens/public/
pm2 restart urban-kitchens
```

### Database Locked Errors

```bash
# SQLite only allows one writer at a time
# Ensure only one Node.js process is running
pm2 status

# If multiple instances, reduce to 1:
# Edit ecosystem.config.js → instances: 1
pm2 restart urban-kitchens
```

### SSL Certificate Errors

```bash
# Check certificate status
sudo certbot certificates

# Renew if expired
sudo certbot renew

# If renewal fails, try:
sudo certbot renew --force-renewal

# Check Nginx SSL config
sudo nginx -t
```

### Memory Issues

```bash
# Check memory usage
free -h
pm2 monit

# If app uses too much memory, adjust ecosystem.config.js:
# max_memory_restart: '512M' → '1G'

# Add swap space if needed:
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Email Not Sending

```bash
# Verify SMTP credentials in .env
cat /var/www/urban-kitchens/.env | grep SMTP

# Test SMTP connection (install telnet if needed)
sudo apt install telnet
telnet smtp.gmail.com 587

# Check application logs for email errors
pm2 logs urban-kitchens | grep -i email
```

### PM2 Not Starting on Reboot

```bash
# Reconfigure PM2 startup
pm2 unstartup
pm2 startup systemd -u root --hp /root
pm2 save

# Verify the startup script
systemctl status pm2-root
```

### Nginx 413 Request Entity Too Large

```bash
# Increase client_max_body_size in Nginx config
sudo nano /etc/nginx/sites-available/urban-kitchens
# Add or change: client_max_body_size 50M;

sudo nginx -t && sudo systemctl reload nginx
```

### Port 3000 Already in Use

```bash
# Find the process using port 3000
sudo lsof -i :3000
# or
sudo ss -tlnp | grep 3000

# Kill the process if needed
sudo kill -9 $(sudo lsof -t -i:3000)

# Restart PM2
pm2 restart urban-kitchens
```

---

## 12. Production File Structure

```
/var/www/urban-kitchens/
├── .env                        # Environment variables (DO NOT COMMIT)
├── .env.example                # Template for .env
├── server.js                   # Next.js standalone server entry point
├── ecosystem.config.js         # PM2 process configuration
├── package.json                # Production dependencies only
├── package-lock.json           # Locked dependency versions
├── node_modules/               # Production dependencies
├── db/
│   └── custom.db               # SQLite database file
├── prisma/
│   └── schema.prisma           # Database schema definition
├── .next/
│   ├── static/                 # Static build assets (JS, CSS, images)
│   │   ├── chunks/             # JavaScript chunks
│   │   ├── css/                # Compiled CSS
│   │   └── media/              # Media assets
│   └── server/                 # Server-side rendering files
│       ├── chunks/             # Server-side chunks
│       ├── pages/              # Page components
│       └── index.js            # Server entry
└── public/                     # Static public assets
    ├── logo-urban.png          # Company logo
    ├── uploads/                # User-uploaded files
    ├── products/               # Product images
    ├── categories/             # Category images
    ├── partners/               # Partner logos
    └── robots.txt              # SEO robots file

/var/log/urban-kitchens/
├── out.log                     # PM2 standard output
└── err.log                     # PM2 error output

/var/log/nginx/
├── urban-kitchens-access.log   # Nginx access log
└── urban-kitchens-error.log    # Nginx error log

/var/www/backups/               # Deployment backups (created by update script)

/etc/nginx/sites-available/
└── urban-kitchens              # Nginx site configuration

/etc/letsencrypt/live/yourdomain.com/
├── fullchain.pem               # SSL certificate
└── privkey.pem                 # SSL private key
```

---

## Quick Reference Card

| Task | Command |
|---|---|
| Deploy (first time) | `sudo ./deploy-hostinger.sh` |
| Update app | `./update-hostinger.sh` |
| Check status | `pm2 status` |
| View logs | `pm2 logs urban-kitchens` |
| Restart app | `pm2 restart urban-kitchens` |
| Reload Nginx | `sudo nginx -t && sudo systemctl reload nginx` |
| Get SSL | `sudo certbot --nginx -d DOMAIN -d www.DOMAIN` |
| Seed database | `curl -X POST http://localhost:3000/api/seed` |
| Backup database | `cp /var/www/urban-kitchens/db/custom.db /backups/db-$(date +%F).db` |
| Edit environment | `nano /var/www/urban-kitchens/.env` |

---

*Last updated: 2025*
