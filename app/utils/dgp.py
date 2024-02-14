import httpx
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.mysql_app.schemas import HomaUserInfo


def auth_is_homa_admin(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())) -> HomaUserInfo:
    homa_jwt_token = credentials.credentials
    if homa_jwt_token is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid Homa token format.")
    url = "https://homa.snapgenshin.com/Passport/UserInfo"
    headers = {
        "Authorization": f"Bearer {homa_jwt_token}"
    }
    response = httpx.get(url, headers=headers).json()
    try:
        if response["data"]["IsMaintainer"]:
            return HomaUserInfo(IsMaintainer=True, NormalizedUserName=response["data"]["NormalizedUserName"])
    except KeyError:
        raise HTTPException(status_code=401, detail="Homa token permission denied.")
    return HomaUserInfo(IsMaintainer=False, NormalizedUserName=response["data"]["NormalizedUserName"])
