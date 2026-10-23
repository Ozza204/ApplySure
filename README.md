# Application OS

A starter workspace for preparing South African bursary applications. The central planned feature is a requirement check: eligibility and application completeness are separate, and a check cannot promise funding or prove document authenticity.

## What runs now

- React UI with email/password signup, login, logout, route protection and empty workspace pages.
- FastAPI `GET /health` and verified-token `GET /api/me`.
- Shared TypeScript/Pydantic shapes for future application-check responses.

The other flows are placeholders. There is no database schema, upload route, scanner, OCR worker, or production checker yet.

## Windows setup

Prerequisites: Node 20.19+ or 22.12+, Python 3.12+, and a Supabase project using an asymmetric JWT signing key. Copy templates with PowerShell:

```powershell
cd frontend
Copy-Item .env.example .env
npm.cmd ci
npm.cmd run dev
```

Edit `frontend/.env` with your Supabase project URL and **publishable** key. In Supabase Auth, configure the local site URL `http://localhost:5173` and redirect URL `http://localhost:5173/**`. If email confirmation is enabled, confirm the account from the email before logging in.

In another PowerShell terminal:

```powershell
cd backend
Copy-Item .env.example .env
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.lock
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Edit `backend/.env` with the same Supabase URL. The API runs at `http://localhost:8000`; Vite proxies `/api` to it. Open `http://localhost:5173`. The frontend works as a route and auth scaffold before any tables exist. A Supabase project with legacy symmetric JWT signing needs migration to asymmetric signing before `/api/me` can accept its tokens; the backend intentionally has no shared-secret fallback.

## Checks

```powershell
cd frontend
npm.cmd run typecheck
npm.cmd run build
cd ..\backend
.\.venv\Scripts\python.exe -m pytest -q
```

## Configuration and deployment

Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are embedded in the browser bundle. Never put service-role keys or JWT secrets in `VITE_` variables. `SUPABASE_URL` and comma-separated `CORS_ORIGINS` configure the backend. The Vercel project root should be `frontend`; build command `npm run build`, output directory `dist`. Deploying the API and routing `/api` to it is a later integration step. Review the CSP in `frontend/vercel.json` when adding an API host: it currently allows same-origin requests and Supabase project connections.

Local planning notes are kept in the ignored `docs/` directory and are not part of the pushed repository. No live Supabase resources are changed by this repository.
