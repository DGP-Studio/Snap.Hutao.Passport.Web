import httpx
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, APIKeyHeader

from app.mysql_app.crud import validate_passport_token
from app.mysql_app.database import SessionLocal
from app.mysql_app.schemas import HomaUserInfo, PassportTokenPublic

homa_bearer = HTTPBearer(auto_error=False, scheme_name="Homa Token")
passport_api_key = APIKeyHeader(name="X-Passport-APIKey", auto_error=False, scheme_name="Passport Token")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def auth_is_homa_token(credentials: HTTPAuthorizationCredentials = Depends(homa_bearer)) -> HomaUserInfo:
    if credentials is None:
        return HomaUserInfo(IsMaintainer=False, NormalizedUserName=None)
    homa_jwt_token = credentials.credentials
    url = "https://homa.snapgenshin.com/Passport/UserInfo"
    headers = {
        "Authorization": f"Bearer {homa_jwt_token}"
    }
    response = httpx.get(url, headers=headers).json()
    try:
        if response["data"]["IsMaintainer"]:
            return HomaUserInfo(IsMaintainer=True, NormalizedUserName=response["data"]["NormalizedUserName"])
    except KeyError:
        return HomaUserInfo(IsMaintainer=False, NormalizedUserName=None)
    return HomaUserInfo(IsMaintainer=False, NormalizedUserName=response["data"]["NormalizedUserName"])


def auth_is_passport_token(db: SessionLocal = Depends(get_db),
                           credentials: HTTPAuthorizationCredentials = Depends(passport_api_key)
                           ) -> PassportTokenPublic:
    if credentials is None:
        return PassportTokenPublic(Authority=None)
    token = str(credentials)
    RedemptionToken = validate_passport_token(db, token)
    if RedemptionToken is None:
        return PassportTokenPublic(Authority=None)
    return PassportTokenPublic(Authority=RedemptionToken.authority)
