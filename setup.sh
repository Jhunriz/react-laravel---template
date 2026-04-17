#!/bin/bash

echo "🚀 Setting up React Laravel Template..."
echo "========================================"

# Check if required tools are installed
command -v php >/dev/null 2>&1 || { echo "❌ PHP is not installed. Please install PHP 8.3+ first."; exit 1; }
command -v composer >/dev/null 2>&1 || { echo "❌ Composer is not installed. Please install Composer first."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is not installed. Please install Node.js 18+ first."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is not installed. Please install npm first."; exit 1; }

echo "✅ Required tools are installed"

# Backend setup
echo "📦 Setting up Laravel backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "📋 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "ℹ️  .env file already exists"
fi

echo "📦 Installing Composer dependencies..."
composer install

echo "🔑 Generating application key..."
php artisan key:generate

echo "🗄️  Setting up database..."
# Check if database is configured
DB_CONNECTION=$(grep "^DB_CONNECTION=" .env | cut -d '=' -f2)
if [ "$DB_CONNECTION" = "sqlite" ]; then
    # Create SQLite database if it doesn't exist
    DB_DATABASE=$(grep "^DB_DATABASE=" .env | cut -d '=' -f2)
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

# Frontend setup
echo "📦 Setting up React frontend..."
cd frontend

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