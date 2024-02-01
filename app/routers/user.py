from fastapi import APIRouter, Request
from pydantic import BaseModel


class LoginData(BaseModel):
    username: str
    encoded_password: str


router = APIRouter(prefix="/users", tags=["users"])


@router.post("/login")
async def login(login_request: LoginData):
    login_request = login_request.dict()
    print(login_request["username"], login_request["encoded_password"])
    return None
