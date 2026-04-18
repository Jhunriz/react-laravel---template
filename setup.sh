#!/bin/bash

set -e  # 🔥 stop script immediately on error

echo "🚀 Setting up React Laravel Template..."
echo "========================================"

# Check if required tools are installed
command -v php >/dev/null 2>&1 || { echo "❌ PHP is not installed. Please install PHP 8.3+ first."; exit 1; }
command -v composer >/dev/null 2>&1 || { echo "❌ Composer is not installed. Please install Composer first."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is not installed. Please install Node.js 18+ first."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is not installed. Please install npm first."; exit 1; }

echo "✅ Required tools are installed"

# =========================
# Backend setup
# =========================
echo "📦 Setting up Laravel backend..."

cd backend || { echo "❌ backend folder not found"; exit 1; }

if [ ! -f ".env" ]; then
    echo "📋 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "ℹ️  .env file already exists"
fi

echo "📦 Installing Composer dependencies..."

# Clear cache (helps on Windows issues)
composer clear-cache

# Install dependencies safely
COMPOSER_MEMORY_LIMIT=-1 composer install --no-interaction --prefer-dist --optimize-autoloader

# Validate installation
if [ ! -f "vendor/autoload.php" ]; then
    echo "❌ Composer failed: vendor/autoload.php missing"
    exit 1
fi

echo "✅ Composer dependencies installed"

echo "🔑 Generating application key..."
php artisan key:generate

echo "🗄️  Setting up database..."

# Read DB connection safely
DB_CONNECTION=$(grep "^DB_CONNECTION=" .env | cut -d '=' -f2 | tr -d '\r')

if [ "$DB_CONNECTION" = "sqlite" ]; then
    DB_DATABASE=$(grep "^DB_DATABASE=" .env | cut -d '=' -f2 | tr -d '\r')

    if [ ! -f "$DB_DATABASE" ]; then
        touch "$DB_DATABASE"
        echo "✅ SQLite database created at $DB_DATABASE"
    fi
fi

echo "🗄️  Running migrations..."
php artisan migrate

echo "🌱 Seeding database (optional)..."
read -p "Do you want to seed the database with sample data? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    php artisan db:seed
    echo "✅ Database seeded"
else
    echo "ℹ️  Skipping database seeding"
fi

cd ..

# =========================
# Frontend setup
# =========================
echo "📦 Setting up React frontend..."

cd frontend || { echo "❌ frontend folder not found"; exit 1; }

echo "📦 Installing npm dependencies..."
npm install

cd ..

echo ""
echo "🎉 Setup complete!"
echo "=================="
echo "To start development servers, run:"
echo "  npm run dev"
echo ""
echo "Or use Docker:"
echo "  npm run docker:dev"
echo ""
echo "Frontend will be available at: http://localhost:5173"
echo "Backend API will be available at: http://localhost:8000"