# ActivePulse Tracker

ActivePulse Tracker is a fullstack fitness tracking app built with Vue, Express, JWT authentication, and MySQL.

## Features

- User registration and login with JWT
- Workout CRUD for the signed-in user
- Exercise type CRUD
- Fitness goal CRUD
- Dashboard summary for workouts, minutes, calories, and goals
- Admin user management
- Server-side authorization using verified JWT user data
- Centralized frontend API communication
- MVC-style separation on both client and server

## Render settings

Root Directory: `server`

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

Environment variables:

```txt
MYSQL_PUBLIC_URL=your_mysql_connection_url
JWT_SECRET=your_secret_key
```

The app creates required tables and demo accounts automatically on server start.

Demo accounts:

```txt
admin / 123
john / 123
```
