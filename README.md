# Weather Forecast Application

A weather forecast app built with React, Vite, and Fastify. Search for cities and view weather forecasts powered by OpenWeatherMap.

## Get Started

### 1. Prerequisites

- **Node.js** 18+
- **pnpm** (or use `npm` if you prefer)
- OpenWeatherMap API key (free - sign up at [openweathermap.org/api](https://openweathermap.org/api))

### 2. Install & Setup

Clone the repository:

```bash
git clone https://github.com/TSmota/devpro-op01928.git
cd devpro-op01928
```

Install dependencies:

```bash
pnpm install
```

Create `.env` files:

**`apps/api/.env`**

```env
OPENWEATHERMAP_API_KEY=your_key_here
PORT=3000
```

**`apps/web/.env`**

```env
VITE_BACKEND_URL=http://localhost:3000
```

### 3. Run the App

Start everything:

```bash
pnpm dev
```

- **Web app**: http://localhost:5173
- **API server**: http://localhost:3000

## Project Structure

```text
apps/
  ├── api/     → Fastify backend server
  └── web/     → React + Vite frontend
packages/
  ├── models/      → Shared data models
  ├── services/    → HTTP service
  └── utils/       → Helper functions
```

## Available Commands

```bash
pnpm dev          # Start everything
pnpm build        # Build for production
pnpm lint         # Check code quality
pnpm format       # Format code
```

## Troubleshooting

### Port already in use

- API: Change `PORT` in `apps/api/.env`

### API key not working

- Verify your OpenWeatherMap API key is correct
- Check the API key has weather data access enabled

### Can't connect to API

- Make sure API is running: `pnpm --filter api dev`
- Verify `VITE_BACKEND_URL` matches API port in `.env`

### Dependencies issues

- Clear cache: `pnpm store prune`
- Reinstall: `pnpm install`

## Tech Stack

React • Vite • Fastify • TypeScript • Turborepo

---

Questions? Check the docs:

- [Vite](https://vitejs.dev)
- [Fastify](https://www.fastify.io/)
- [Turborepo](https://turbo.build/repo)
