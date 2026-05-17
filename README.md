# DRP Exotic Farms

A cinematic luxury-brand frontend paired with a new FastAPI + MongoDB Atlas + Cloudinary editorial CMS.

## Frontend

The public site is built with:

- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- Zustand

New public features added:

- Dynamic gallery consumption from the API with fallback content
- Blog listing at `/journal`
- Blog article detail at `/journal/:slug`
- Homepage editorial news ticker beneath the hero
- Premium admin CMS routes under `/admin`

Frontend environment variables:

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_WHATSAPP_PHONE=919876543210
VITE_GOOGLE_MAPS_EMBED_URL=...
VITE_CONTACT_FORM_ENDPOINT=
VITE_NEWSLETTER_ENDPOINT=
```

Start the frontend:

```bash
npm install
npm run dev
```

## Backend

The backend lives in [backend/app/main.py](/home/lap-46/Documents/drp_frontend_v3_done/drp_frontend_v1_done/drp/backend/app/main.py) and provides:

- JWT admin authentication
- MongoDB Atlas persistence with Motor
- Cloudinary-backed media upload/delete
- Admin CRUD for blogs, gallery items, media, categories, and tags
- Public blog, related-post, gallery, and homepage news endpoints

Backend environment setup:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Required backend `.env` values:

- `MONGO_URI`
- `MONGO_DB_NAME`
- `JWT_SECRET_KEY`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CORS_ORIGINS`

Run the API:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check:

```bash
GET http://localhost:8000/health
```

Docs:

```bash
http://localhost:8000/docs
```

## API Surface

Admin:

- `POST /api/v1/admin/auth/login`
- `GET /api/v1/admin/auth/me`
- `GET /api/v1/admin/dashboard/overview`
- `GET|POST|PUT|DELETE /api/v1/admin/gallery`
- `POST /api/v1/admin/gallery/reorder`
- `GET|POST|PUT|DELETE /api/v1/admin/blogs`
- `GET|POST|DELETE /api/v1/admin/media`
- `GET|POST /api/v1/admin/taxonomy/categories`
- `GET|POST /api/v1/admin/taxonomy/tags`

Public:

- `GET /api/v1/public/gallery`
- `GET /api/v1/public/blogs`
- `GET /api/v1/public/blogs/:slug`
- `GET /api/v1/public/blogs/:slug/related`
- `GET /api/v1/public/home/news`

## Notes

- The admin login now expects backend credentials, not the old `VITE_ADMIN_PASSWORD` frontend-only shortcut.
- The frontend contains polished fallback editorial data so layouts remain populated before the backend is seeded.
- Media assets are uploaded to Cloudinary; MongoDB stores metadata and references only.
