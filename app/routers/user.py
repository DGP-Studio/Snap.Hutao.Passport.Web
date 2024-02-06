from fastapi import APIRouter
from fastapi.responses import RedirectResponse
import urllib.parse

from app.config import HOSTNAME

router = APIRouter(prefix="/users", tags=["users"])


# Login with GitHub
@router.get("/login", response_class=RedirectResponse)
async def login_with_github(token: str):
	response = RedirectResponse(url="/dashboard.html", status_code=302)
	cookie_value = urllib.parse.quote(f"Bearer {token}")
	response.set_cookie(key="token", value=cookie_value, max_age=60 * 60 * 3, domain=HOSTNAME)
	return response
