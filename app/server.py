from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.config import env_result
from app.routers import user, token, redemption

app = FastAPI(openapi_url=None, docs_url=None, redoc_url=None)
api_app = FastAPI(title="Hutao Passport API", openapi_url="/openapi.json")

api_app.include_router(user.router)
api_app.include_router(token.router)
api_app.include_router(redemption.router)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8080",
]

api_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/api", api_app, name="Hutao Passport API")


# Mount the static files directory
app.mount("/", StaticFiles(directory="./app/static/", html=True), name="static")
