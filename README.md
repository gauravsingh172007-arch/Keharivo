# Keharivo

## Run the storefront

In the project root, install the frontend dependencies and start Vite:

```powershell
npm install
npm run dev
```

## Run the backend

In a second terminal from the project root:

```powershell
python -m venv backend\venv
.\backend\venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Set `MONGODB_URI` in `backend/.env` to connect MongoDB. The backend seeds an empty `products` collection from `shared/products.json`. If MongoDB is unavailable, the API serves that shared catalog and the storefront displays its current data source. If the backend is stopped, the storefront falls back to the same catalog locally.

The Vite development server proxies `/api` requests to `http://127.0.0.1:8000`. Product data is available at `/api/products`; backend and database status is available at `/api/health`.