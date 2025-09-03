# Messaging App

Full-stack messaging application with Next.js, Node.js, tRPC, Drizzle ORM, and PostgreSQL.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

## Setup

1. **Install dependencies**

```bash
pnpm install
cd backend && pnpm install
cd ../frontend && pnpm install && cd ..
```

2. **Start database**

```bash
docker compose up -d
```

3. **Setup database**

```bash
cd backend && npx drizzle-kit push
```

4. **Seed Database**

```bash
cd backend && pnpm tsx src/db/seed.ts
```

## Development

```bash
# Start both frontend and backend
pnpm dev

# Or individually
pnpm dev:backend  # Backend only
pnpm dev:frontend # Frontend only
```

## Users

Here are the user credentials you can use to login:

| Name | Email            | Password |
| ---- | ---------------- | -------- |
| John | john@example.com | 123456   |
| Jane | jane@example.com | 123456   |
| Jim  | jim@example.com  | 123456   |
| Jill | jill@example.com | 123456   |
| Jack | jack@example.com | 123456   |

Use the names above when you want to create a new chat with a user.

## URLS

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
