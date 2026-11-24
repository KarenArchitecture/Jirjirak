# Jirjirak Studio

Monorepo for the Jirjirak website.

- `frontend/`: existing React + TypeScript + Vite application.
- `backend/`: ASP.NET Core 10 Clean Architecture foundation.
- `db`: PostgreSQL 17 container.
- `compose.yaml`: local development stack with hot reload.
- `compose.production.yaml`: production-oriented stack.

## Prerequisites

For the one-command Docker workflow:

- Git
- Docker Desktop with the Docker Compose plugin enabled
- Windows users: Docker Desktop running with the WSL 2 backend

You do **not** need Node.js, .NET SDK, Visual Studio, VS Code, or a local PostgreSQL installation just to run the Dockerized application.

## First run on a new machine

```powershell
git clone --branch jirjirak-overhaul https://github.com/KarenArchitecture/Jirjirak.git
cd Jirjirak

Copy-Item .env.example .env

docker compose up --build -d
```

Wait for the containers to start, then open:

- Website: http://localhost:3000
- API health check: http://localhost:8080/api/health
- OpenAPI document (Development): http://localhost:8080/openapi/v1.json

The website is served by Vite in development mode. Requests under `/api` are proxied to ASP.NET Core.

## Useful Docker commands

```powershell
# Start or rebuild the full development stack
docker compose up --build -d

# Follow all logs
docker compose logs -f

# Follow only API logs
docker compose logs -f api

# Follow only frontend logs
docker compose logs -f frontend

# Stop containers; database data remains in its volume
docker compose down

# Stop containers AND delete the PostgreSQL data volume (destructive)
docker compose down -v
```

## Production-style local run

Set a strong `POSTGRES_PASSWORD` in the root `.env` file, then run:

```powershell
docker compose -f compose.production.yaml up --build -d
```

Open http://localhost (or the value configured by `HTTP_PORT`).

The production frontend is served by Nginx. Nginx serves the SPA and reverse-proxies `/api/*` requests to the API container.

## Development with Visual Studio and VS Code

You can still use each IDE natively.

1. Start only PostgreSQL:

   ```powershell
   docker compose up -d db
   ```

2. Open `backend/Jirjirak.sln` in Visual Studio and run `Jirjirak.Api`.
   - The Development connection string points to `localhost:5432`.
   - The API listens on `http://localhost:8080`.

3. Open `frontend/` in VS Code:

   ```powershell
   npm install
   npm run dev
   ```

4. Open http://localhost:3000.

Vite proxies `/api` requests to `http://localhost:8080` by default. For a different API address, set `API_PROXY_TARGET` before starting Vite.

## Backend architecture

```text
backend/
├── Jirjirak.sln
└── src/
    ├── Jirjirak.Api/
    ├── Jirjirak.Application/
    ├── Jirjirak.Domain/
    └── Jirjirak.Infrastructure/
```

Dependency direction:

- `Domain`: core domain model; no infrastructure dependency.
- `Application`: use cases and application contracts; references Domain.
- `Infrastructure`: EF Core, Npgsql and external implementations; references Application and Domain.
- `Api`: HTTP entry point and dependency composition.

The initial `AppDbContext` is intentionally empty. No business entities, tables, migrations, authentication, CMS or contact workflow have been introduced in this infrastructure-only step.

## Database

PostgreSQL 17 runs as an official Docker image. Its data is stored in the named `postgres_data` volume and survives normal `docker compose down`.

To connect from a local database client during development:

- Host: `localhost`
- Port: value of `POSTGRES_PORT` (default `5432`)
- Database: value of `POSTGRES_DB` (default `jirjirak`)
- Username: value of `POSTGRES_USER` (default `jirjirak`)
- Password: value of `POSTGRES_PASSWORD` in `.env`

Do not commit `.env` or production credentials.
