Railway deployment guide — Laravel + Inertia (React)

Overview
- This project uses Laravel (backend) + Inertia + React (frontend). We'll deploy using Docker on Railway.

Required environment variables (set these in Railway project settings -> Variables):
- APP_KEY: run `php artisan key:generate --show` locally and set the value
- APP_ENV=production
- APP_DEBUG=false
- APP_URL=https://<your-railway-domain>
- DB_CONNECTION=mysql  (or `pgsql` if you choose Postgres)
- DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD (from Railway database plugin)
- OMDB_API_KEY (your OMDb API key)
- SESSION_DRIVER=cookie (or redis if configured)
- CACHE_DRIVER=file
- QUEUE_CONNECTION=sync

Files added
- `Dockerfile` — builds PHP + Apache, installs composer, builds frontend assets.
- `.dockerignore` — ignores vendor, node_modules, .env, etc.

Railway steps (recommended)
1. Initialize project (if not already):

```bash
railway init   # or use railway up to create a project
```

2. Connect to GitHub (optional):
- In Railway dashboard, create a new project and connect your GitHub repository. Enable Deployments so each push triggers a build.

3. If you prefer manual Docker deploy: push the repo to Railway and configure Docker deployment. The provided `Dockerfile` will be used.

4. Set environment variables in the Railway project settings (see list above).

5. Deploy: let Railway build the Docker image.

Post-deploy steps
- Run migrations and seeders once (via Railway plugin or Railway CLI):

```bash
railway run php artisan migrate --force
railway run php artisan db:seed --class=DatabaseSeeder --force
```

- Create storage symlink (if you store user-uploaded files):

```bash
railway run php artisan storage:link
```

Notes & recommendations
- The `Dockerfile` included uses `php:8.2-apache` and installs Node to build assets. It is a reasonable starting point but not optimized for production-scale apps.
- If you expect production traffic, consider:
  - Using a multi-stage Dockerfile with separate build containers (node / composer) to reduce final image size.
  - Using a managed database (Railway plugin) and Redis for sessions/cache.
  - Storing secrets (APP_KEY, OMDB_API_KEY) via Railway environment variables only.
- To run artisan commands locally inside the Docker container use `railway run` or create a temporary shell: `railway run bash` then `php artisan ...`.

If you want, I can:
- Create a multi-stage optimized Dockerfile instead.
- Add a `Procfile` or `Dockerfile` tweaks for a leaner image.
- Run the Railway deploy steps for you (I will need permission to run Railway CLI here). 
