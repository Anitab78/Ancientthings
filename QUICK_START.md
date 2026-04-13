# Quick Start Guide - PostgreSQL Setup

## 1. Install PostgreSQL (5 minutes)
- Download: https://www.postgresql.org/download/windows/
- Run installer → Follow wizard → Set postgres password → Finish
- Test: Open Command Prompt, run `psql --version` ✓

## 2. Create Database & Tables (2 minutes)
Open Command Prompt:
```bash
psql -U postgres -h localhost
```
Enter password, then copy-paste all SQL from `DATABASE_CONNECTION_GUIDE.md` Step 2.4 and Step 3.

Exit with `\q`

## 3. Update .env File (1 minute)
Edit `d:\ancientss\anicients2\.env`:
- Change `DB_PASSWORD=postgres` to your actual postgres password
- Save file

## 4. Start Backend (1 minute)
Open Command Prompt:
```bash
cd d:\ancientss\anicients2
npm run server
```
Wait for: ✓ Connected to PostgreSQL Database

## 5. Start Frontend (1 minute)
Open new Command Prompt tab:
```bash
cd d:\ancientss\anicients2
npm run dev
```

## 6. Test Application
- Open: http://localhost:5173
- Register/Login
- Browse products
- Add to cart
- Place order ✓

## What Changed

| File | Change |
|------|--------|
| `productRoutes.js` | Now uses PostgreSQL queries |
| `userRoutes.js` | Now uses PostgreSQL for authentication |
| `orderRoutes.js` | Now uses PostgreSQL for orders |
| `postgres.js` | New file - database connection module |
| `.env` | Added database credentials |

## Verification Checklist

- [ ] PostgreSQL installed
- [ ] `psql --version` shows version 15+
- [ ] Database `ancients_db` created
- [ ] All 4 tables created (products, users, orders, order_items)
- [ ] 10 sample products inserted
- [ ] `.env` file updated with DB_PASSWORD
- [ ] Backend starts with "Connected to PostgreSQL Database"
- [ ] Frontend loads at http://localhost:5173
- [ ] Can register/login user
- [ ] Can create order

## Full Documentation

- Setup: See `DATABASE_CONNECTION_GUIDE.md`
- Migration details: See `POSTGRESQL_MIGRATION_SUMMARY.md`
- Server startup: See `START_SERVERS.md`

## Common Commands

Start both servers:
```bash
# Terminal 1
cd d:\ancientss\anicients2 && npm run server

# Terminal 2  
cd d:\ancientss\anicients2 && npm run dev
```

Check database:
```bash
psql -U postgres -d ancients_db -c "SELECT COUNT(*) FROM products;"
```

View logs:
```bash
# Backend logs will show in terminal where npm run server is running
```

## Issues?

1. **Port 5000/5173 in use?** Kill process or use different port
2. **Database connection refused?** PostgreSQL not running
3. **Wrong password?** Check `.env` matches postgres password
4. **Table not found?** Run SQL creation commands from DATABASE_CONNECTION_GUIDE.md

Get help: Check the troubleshooting section in `DATABASE_CONNECTION_GUIDE.md`
