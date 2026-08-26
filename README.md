# Brian Gakere Portfolio

A Nuxt 4 frontend + Strapi 5 CMS powering Brian Gakere's personal portfolio site. Both apps are containerized for local dev and deployment.

- `app/` — Nuxt frontend (Tailwind CSS, brand colors: navy `#050C2B`, teal `#0F8D98`)
- `cms/` — Strapi headless CMS/API (SQLite by default), with content types for Hero, Services, Organisations, Case Studies, Blog Posts, and Books
- `docker-compose.yml` — runs both services together

## Quick start (Docker)

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Strapi admin: http://localhost:1337/admin (create your first admin user on first visit)

On first boot, Strapi seeds Site Settings, Hero, Services, and Organisations content automatically, and grants public read access to the API.

## Local development (without Docker)

Run each service in its own terminal.

**CMS:**
```bash
cd cms
npm install
npm run develop
```

**Frontend:**
```bash
npm install
npm run dev
```

The frontend expects Strapi at `http://localhost:1337` by default (set via `NUXT_PUBLIC_STRAPI_URL` / `NUXT_STRAPI_URL` env vars if different).

## Content model

Edit content in the Strapi admin (`/admin`):
- **Hero** (single type) — homepage heading, subheading, portrait, stats
- **Site Setting** (single type) — contact info, social links
- **Service** (collection) — AI Solutions, AI Training, Mentorship & Coaching, Teaching
- **Organisation** (collection) — Online Ecclesia, Ujuzi Global
- **Case Study** (collection) — client case studies shown on the homepage
- **Blog Post** / **Book** (collections) — optional content, sections hide automatically when empty
