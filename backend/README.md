# TripMate Backend (Development)

This is a minimal Express.js backend used for local development with the TripMate frontend.

Quick start

1. Open a terminal and change to the `backend` folder:

```powershell
cd backend
```

2. Install dependencies:

```powershell
npm install
```

3. Start in development mode (auto-restarts on save):

```powershell
npm run dev
```

The server listens on port `4000` by default and exposes the following endpoints:

- `GET /api/health` - health check
- `GET /api/users` - list users
- `POST /api/users` - create user (body: `{ name, email, password }`)
- `POST /api/login` - login (body: `{ email, password }`)
- `GET /api/favourites/:email` - get favourites for a user
- `PUT /api/favourites/:email` - replace favourites array for a user (body: `[...]`)
- `GET /api/bookings/:email` - get bookings for a user
- `PUT /api/bookings/:email` - replace bookings array for a user (body: `[...]`)

Data is persisted to `data.json` in this folder for simplicity. This is intended for local development only — do not use in production.
