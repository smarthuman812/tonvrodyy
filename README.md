# TONRODY

This repository contains a complete local stack for the TONRODY project, comprising a Node.js backend,
a React/Vite frontend, and a placeholder smart contract written in Tact. The application provides
lobby creation and participation, referral tracking, Telegram WebApp authentication, and TON wallet
integration via TON Connect. It is designed as a pnpm monorepo and includes Docker support for
running the services in containers.

## Repository structure

```
tonvrodyy/
├─ backend/         # Express + TypeScript REST API
├─ frontend/        # React + Vite web application
├─ contracts/       # Tact smart contract placeholder
├─ docker-compose.yml
├─ Dockerfile
├─ pnpm-workspace.yaml
└─ README.md
```

### Backend

The backend is built with Express and connects to Supabase for persistent storage. It exposes
REST endpoints under the `/api` namespace:

- `POST /api/auth/telegram` verifies Telegram WebApp init data and creates or retrieves a user.
- `GET /api/lobby` lists all lobbies.
- `POST /api/lobby` creates a new lobby.
- `POST /api/lobby/join` allows a user to join a lobby and updates the prize pool.
- `GET /api/referrals` returns referrals for a given user.
- `GET /api/profile` returns a user profile.
- `POST /api/ton/events` is a stub for handling TON Connect webhooks.

Environment variables are defined in `backend/.env.example` and should be copied into a `.env`
file for local development. Key variables include `SUPABASE_URL`, `SUPABASE_KEY`, and
`TELEGRAM_INIT_SECRET`.

### Frontend

The frontend is a SPA built with React and Vite. It uses `tonconnect-ui-react` to integrate the
TON wallet and the Telegram WebApp SDK (when running inside Telegram) to obtain user
information. Navigation is handled by React Router. Key pages include:

- **Home** – a simple landing page.
- **Lobby** – displays available lobbies and allows users to create and join lobbies.
- **Wallet** – shows the connected wallet address.
- **Referrals** – displays the user’s referral code and children referrals.
- **Profile** – displays user details pulled from the backend.

The frontend expects a running backend and reads its base URL from `VITE_PUBLIC_BACKEND_URL`.

### Smart contract

The `contracts` directory contains a placeholder `main.tact` file. In a full implementation this
contract would handle on‑chain logic such as prize pool management and distribution.

### Tests

Vitest is configured for the backend. Run `pnpm --filter backend test` from the repository root to
execute the test suite. The provided tests currently cover the weighted winner selection logic and
the TON Connect webhook stub.

### Docker

A `docker-compose.yml` file is provided to run the backend and frontend services in containers. To
build and start the containers:

```sh
docker compose up --build
```

The backend will be available at `http://localhost:4000` and the frontend at
`http://localhost:5173`.

### Development

This project uses pnpm workspaces. Ensure pnpm is installed (`npm install -g pnpm`), then run:

```sh
pnpm install
pnpm --filter backend dev      # start backend in watch mode
pnpm --filter frontend dev     # start frontend with Vite
```

The Supabase database schema is defined in `backend/db/migrations/0001_init.sql`. You can apply
this migration using the Supabase CLI:

```sh
supabase db push
```

### License

This project is provided for demonstration purposes and does not include any warranty.
