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

## Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.3 or higher**
- **Composer** (PHP dependency manager)
- **Node.js 18+ and npm**
- **MySQL or SQLite** (for database)

## Installation

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
