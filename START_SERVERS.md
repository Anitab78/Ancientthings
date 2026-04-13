# Starting the Application

## Prerequisites
- PostgreSQL installed and running
- Database created: `ancients_db`
- `.env` file configured with database credentials

## 1. Start Backend Server

Open Command Prompt and navigate to project:
```bash
cd d:\ancientss\anicients2
npm run server
```

Expected output:
```
Server running on http://localhost:5000
✓ Connected to PostgreSQL Database
```

## 2. Start Frontend Server (in new Command Prompt tab)

```bash
cd d:\ancientss\anicients2
npm run dev
```

Expected output:
```
VITE v5.4.21  ready in XXX ms

➜  Local:   http://localhost:5173/
```

## 3. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## Verification Checklist

- [x] Backend server running on port 5000
- [x] Frontend server running on port 5173
- [x] PostgreSQL database connected
- [x] All API routes migrated to PostgreSQL
- [x] JWT authentication working
- [x] Product stock management working
- [x] Order creation with inventory updates working

## Useful Commands

### View Database
```bash
psql -U postgres -d ancients_db -h localhost
```

### Install MongoDB (optional, not needed for this setup)
```bash
npm uninstall mongoose
```

### Restart Backend
Stop with Ctrl+C, then run:
```bash
npm run server
```

### Development Mode (auto-restart on changes)
```bash
npm run server:dev
```
(Requires nodemon, already installed)

## Common Issues

**Backend won't start:**
- Ensure PostgreSQL is running (Windows Services)
- Check `.env` file has correct DB credentials
- Verify port 5000 is not in use

**Frontend won't load:**
- Ensure backend is running first
- Check CORS is enabled in server.js
- Verify port 5173 is not in use

**Database connection errors:**
- Verify database credentials in `.env`
- Check PostgreSQL password matches
- Ensure database `ancients_db` exists
