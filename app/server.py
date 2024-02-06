from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routers import user

app = FastAPI(openapi_url=None, docs_url=None, redoc_url=None)
api_app = FastAPI(title="Passport API", openapi_url="/api/openapi.json")

api_app.include_router(user.router)
app.mount("/api", api_app)

# Mount the static files directory
app.mount("/", StaticFiles(directory="./app/static/", html=True), name="static")
