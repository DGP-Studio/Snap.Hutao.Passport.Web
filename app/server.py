from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routers import user, redemption

app = FastAPI(openapi_url=None, docs_url=None, redoc_url=None)
api_app = FastAPI(title="Hutao Passport API", openapi_url="/openapi.json")

api_app.include_router(user.router)
api_app.include_router(redemption.router)
app.mount("/api", api_app, name="Hutao Passport API")

# Mount the static files directory
app.mount("/", StaticFiles(directory="./app/static/", html=True), name="static")
