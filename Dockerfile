# Use PHP 8.3 with Apache as base image
FROM php:8.3-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first for better caching
COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copy Laravel application
COPY backend/ .

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Copy environment file
COPY backend/.env.example .env

# Generate application key
RUN php artisan key:generate

# Install Node.js dependencies for frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy frontend source
COPY frontend/ ./frontend/

# Build frontend for production (optional, comment out for dev)
# RUN cd frontend && npm run build

# Expose ports
EXPOSE 80 5173

# Copy custom Apache config if needed
# COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Create startup script
RUN echo '#!/bin/bash\n\
# Start Laravel backend\n\
php artisan serve --host=0.0.0.0 --port=8000 &\n\
\n\
# Start frontend dev server\n\
cd frontend && npm run dev -- --host 0.0.0.0 &\n\
\n\
# Wait for both processes\n\
wait' > /usr/local/bin/start.sh && chmod +x /usr/local/bin/start.sh

# Start both services
CMD ["/usr/local/bin/start.sh"]