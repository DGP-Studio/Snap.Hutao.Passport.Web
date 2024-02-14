from fastapi import APIRouter, Depends, Request, Security, HTTPException, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.mysql_app.database import SessionLocal, engine
from app.mysql_app import crud, models, schemas
from app.mysql_app.schemas import RedemptionToken, RedemptionCode, StandardResponse, HomaUserInfo
from pydantic import BaseModel
from app.utils.dgp import auth_is_homa_admin

"""
Verification process:

# Token endpoints: /redemption/token/add, /redemption/token/update
1. Receive Bearer token from request header
2. Verify token with Homa server, check if token belongs to a maintainer
3. If token is valid, proceed to next step, otherwise raise 403 error

# Redemption code endpoints: /redemption/code/add
1. Receive Bearer token from request header
2. Verify token with Homa server, check if token belongs the user
3. If token is valid, proceed to next step, otherwise raise 403 error

# Redemption code endpoints: /redemption/code/gift
1. Check user is exist in database
2. If user is valid, proceed to next step, otherwise raise 403 error
"""


class UpdateRedemptionTokenModel(BaseModel):
    old_token: str
    new_token: str
    authority: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter(tags=["redemption"], prefix="/redemption")


@router.post("/token/add", response_model=StandardResponse)
async def add_redemption_token(token_data: RedemptionToken, response: Response, db: SessionLocal = Depends(get_db),
                               security: HTTPAuthorizationCredentials = Security(HTTPBearer())):
    # Homa token verification
    homa_user_info = auth_is_homa_admin(security)
    if not homa_user_info.IsMaintainer:
        response_body = StandardResponse(messgae="Permission denied.")
        response_body.retcode = response.status_code = 401
        return response_body
    # Verify duplicated token
    validated_token = crud.validate_redemption_token(db, token_data.token)
    if validated_token:
        response_body = StandardResponse(message="Failed to add redemption token, token already exists.")
        response_body.retcode = response.status_code = 403
        return response_body
    # Process to add token
    result = crud.add_redemption_token(db, token_data)
    if not result:
        response_body = StandardResponse(message="Failed to add redemption token")
        response_body.retcode = response.status_code = 400
        return response
    response_body = StandardResponse(data={
        "token": result.token,
        "authority": result.authority
    })
    print(f"Redemption token add result: {result.authority} -> {result.token}")
    return response_body


@router.post("/token/update", response_model=StandardResponse)
async def update_redemption_token(token_data: UpdateRedemptionTokenModel, response: Response,
                                  db: SessionLocal = Depends(get_db),
                                  security: HTTPAuthorizationCredentials = Security(HTTPBearer())):
    # Homa token verification
    homa_user_info = auth_is_homa_admin(security)
    if not homa_user_info.IsMaintainer:
        response_body = StandardResponse()
        response_body.retcode = response.status_code = 401
        response_body.message = "Permission denied."
        return response_body
    # Verify duplicated token
    validate_result = crud.validate_redemption_token(db, token_data.old_token)
    if validate_result:
        response_body = StandardResponse()
        response_body.retcode = response.status_code = 403
        response_body.message = "Failed to update redemption token, duplicated token."
        return response_body
    # Process to update token
    new_token_data = RedemptionToken(token=token_data.new_token, authority=token_data.authority)
    result = crud.update_redemption_token_by_authority(db, new_token_data)
    if not result:
        response_body = StandardResponse(message="Failed to update redemption token, unknown error.")
        response_body.retcode = response.status_code = 400
        return response_body
    response_body = StandardResponse(message="Redemption token updated.")
    response_body.data = {
        "new_token": token_data.new_token,
        "authority": token_data.authority
    }
    return response_body
