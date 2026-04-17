# React Laravel Template

A full-stack web application template featuring a React TypeScript frontend with Vite and a Laravel backend providing REST API services. This monorepo setup allows for seamless development of modern web applications with type-safe frontend code and robust backend APIs.

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **React Hook Form** - Form handling with validation

### Backend
- **Laravel 13** - PHP web framework
- **PHP 8.3** - Server-side scripting
- **Laravel Sanctum** - API authentication
- **MySQL/SQLite** - Database support
- **Composer** - PHP dependency management

## Features

- 🔐 **Authentication**: Laravel Sanctum for secure API authentication
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- 📱 **Type Safety**: Full TypeScript support on frontend
- 🚀 **Fast Development**: Hot reload with Vite
- 📦 **Monorepo**: Single repository for both frontend and backend
- 🛠️ **Developer Tools**: ESLint, Prettier, PHPUnit for quality assurance
- 🔄 **Concurrent Development**: Run both frontend and backend simultaneously

## Quick Start

For a fresh clone, run the automated setup script:

```bash
npm run setup
```

This will:
- ✅ Check for required dependencies (PHP, Composer, Node.js, npm)
- 📋 Create `.env` file from `.env.example`
- 📦 Install backend dependencies with Composer
- 🔑 Generate Laravel application key
- 🗄️ Run database migrations
- 🌱 Optionally seed the database
- 📦 Install frontend dependencies with npm

Then start development:
```bash
npm run dev
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.3 or higher**
- **Composer** (PHP dependency manager)
- **Node.js 18+ and npm**
- **MySQL or SQLite** (for database)

## Manual Installation

If you prefer manual setup or the automated script fails:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd react-laravel-template
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   composer install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database:**
   Update `.env` file with your database credentials, then run:
   ```bash
   php artisan migrate
   php artisan db:seed  # Optional: seed with sample data
   ```

5. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Return to root directory:**
   ```bash
   cd ..
   ```

## Usage

### Development

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Frontend dev server on `http://localhost:5173`
- Backend API server on `http://localhost:8000`

### Individual Services

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

### Production Build

Build the frontend for production:
```bash
npm run build
```

## Docker

This project includes a Dockerfile for containerized development and deployment.

### Prerequisites for Docker

- **Docker** installed on your system
- **Docker Compose** (optional, for multi-container setups)

### Using Docker

1. **Build the Docker image:**
   ```bash
   docker build -t react-laravel-template .
   ```

2. **Run the container:**
   ```bash
   docker run -p 8000:8000 -p 5173:5173 react-laravel-template
   ```

3. **Access the application:**
   - Frontend dev server: `http://localhost:5173`
   - Backend API: `http://localhost:8000`

### Docker Development Workflow

The Docker setup runs both frontend and backend development servers concurrently with hot reload enabled. For production deployment, you may want to:

- Build the frontend statically
- Use Nginx to serve the built frontend
- Configure Apache/PHP-FPM for the Laravel backend
- Add database containers (MySQL/PostgreSQL)

### Environment Configuration

When using Docker, ensure your `.env` file is properly configured for the container environment. You may need to adjust database host settings if using external database containers.

## API Documentation

The Laravel backend provides REST API endpoints. Key routes include:

- `GET /api/user` - Get authenticated user (requires authentication)
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout

For full API documentation, see the Laravel routes in `backend/routes/api.php`.

## Project Structure

```
├── backend/          # Laravel API application
│   ├── app/         # Application code
│   ├── config/      # Configuration files
│   ├── database/    # Migrations and seeders
│   ├── routes/      # API routes
│   └── ...
├── frontend/        # React TypeScript application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── ...
│   └── ...
└── package.json     # Root scripts for monorepo management
```

## Customization

### Frontend
- Modify components in `frontend/src/components/`
- Update styling with Tailwind classes
- Add new pages in `frontend/src/pages/`
- Configure API calls in `frontend/src/lib/api.ts`

### Backend
- Add new models in `backend/app/Models/`
- Create controllers in `backend/app/Http/Controllers/`
- Define routes in `backend/routes/api.php`
- Add migrations in `backend/database/migrations/`

## Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:
- Check the [Laravel Documentation](https://laravel.com/docs)
- Review [React Documentation](https://react.dev)
- Open an issue in this repository</content>
<parameter name="filePath">/home/codeholder/Desktop/DEV JHUNRIZ/react-laravel---template/README.md
