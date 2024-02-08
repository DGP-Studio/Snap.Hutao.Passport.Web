from fastapi import APIRouter
from fastapi.responses import RedirectResponse

from app.config import HOSTNAME

router = APIRouter(prefix="/users", tags=["users"])


# Login with GitHub
@router.get("/login", response_class=RedirectResponse)
async def login_with_github(token: str):
	response = RedirectResponse(url="/dashboard.html", status_code=302)
	response.set_cookie(key="homa_token", value=token, max_age=60 * 60 * 3, domain=HOSTNAME)
	return response
