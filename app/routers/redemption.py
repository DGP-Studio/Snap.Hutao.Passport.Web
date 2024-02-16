from fastapi import APIRouter, Depends, Security, Response
from fastapi.security import HTTPAuthorizationCredentials
from pydantic import BaseModel
from app.mysql_app import crud
from app.mysql_app.database import SessionLocal
from app.mysql_app.schemas import (RedemptionCode, StandardResponse, NewRedemptionCodeRequest)
from app.utils.auth import auth_is_homa_token, auth_is_passport_token, homa_bearer, passport_api_key
from app.utils.homa import assign_homa_user_membership_time


class UseRedemptionCodeRequest(BaseModel):
    code: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter(tags=["redemption"], prefix="/redemption")


@router.post("/add", response_model=StandardResponse)
async def add_redemption_code(code_data: NewRedemptionCodeRequest, response: Response,
                              db: SessionLocal = Depends(get_db),
                              passport_security: HTTPAuthorizationCredentials = Security(passport_api_key),
                              homa_security: HTTPAuthorizationCredentials = Security(homa_bearer)):
    print(f"Code add request details: {code_data}")
    # Start of identity verification
    homa_identity = auth_is_homa_token(homa_security)
    if homa_identity.IsMaintainer:
        CREATED_BY = f"Homa/{homa_identity.NormalizedUserName}"
    else:
        passport_identity = auth_is_passport_token(db, passport_security)
        if passport_identity.Authority:
            CREATED_BY = f"Passport/{passport_identity.Authority}"
        else:
            response_body = StandardResponse()
            response_body.retcode = response.status_code == 401
            response_body.message = "Permission denied."
            return response_body
    print(f"Start process redemption code addition: Authority -> {CREATED_BY}")
    # End of identity verification
    redemption_code_list = []
    invalid_code_list = []
    for code in list(tuple(code_data.code)):
        token_validation = crud.validate_redemption_code(db, code)
        if token_validation:
            invalid_code_list.append(code)
            continue
        redemption_code_list.append(RedemptionCode(code=code, value=code_data.value, description=code_data.description,
                                                   created_by=CREATED_BY))
    if len(redemption_code_list) > 0:
        commit_result = crud.add_redemption_code_list(db, redemption_code_list)
        if commit_result:
            response_body = StandardResponse()
            response_body.message = "Redemption code added successfully."
            response_body.data = {"invalid_code": invalid_code_list,
                                  "valid_code": [code.code for code in redemption_code_list]}
            return response_body
        else:
            response_body = StandardResponse()
            response_body.retcode = response.status_code == 500
            response_body.message = "Failed to add redemption code."
            return response_body
    else:
        response_body = StandardResponse()
        response_body.retcode = response.status_code == 403
        response_body.message = "All codes are invalid."
        response_body.data = {"invalid_code": invalid_code_list}
        return response_body


@router.get("/check-value", response_model=StandardResponse)
async def check_redemption_code_value(code: str, response: Response, db: SessionLocal = Depends(get_db),
                                      security: HTTPAuthorizationCredentials = Security(homa_bearer)):
    print(f"Check redemption code value request: {code}")
    # Check homa authority
    homa_user_info = auth_is_homa_token(security)
    if not homa_user_info.NormalizedUserName:
        response_body = StandardResponse()
        response_body.retcode = response.status_code == 401
        response_body.message = "Permission denied."
        return response_body

    code_value = crud.validate_redemption_code(db, code)
    if not code_value:
        response_body = StandardResponse()
        response_body.retcode = response.status_code == 404
        response_body.message = "Redemption code not found."
        return response_body
    response_body = StandardResponse()
    response_body.message = "Redemption code found."
    response_body.data = {"code": code, "value": code_value.value}
    return response_body


@router.post("/use", response_model=StandardResponse)
async def use_redemption_code(code: UseRedemptionCodeRequest, response: Response, db: SessionLocal = Depends(get_db),
                              security: HTTPAuthorizationCredentials = Security(homa_bearer)):
    # Check homa authority
    homa_user_info = auth_is_homa_token(security)
    if not homa_user_info.NormalizedUserName:
        response_body = StandardResponse()
        response_body.retcode = response.status_code == 401
        response_body.message = "Permission denied."
        return response_body
    normalized_user_name = homa_user_info.NormalizedUserName
    # Process to use code
    code_validation = crud.validate_redemption_code(db, code.code)
    if not code_validation:
        response_body = StandardResponse()
        response_body.retcode = response.status_code == 404
        response_body.message = "Redemption code not found."
        return response_body
    code_value = code_validation.value
    homa_assign_result = assign_homa_user_membership_time(normalized_user_name, code_value)
    if homa_assign_result["status"] == 200:
        use_result = crud.use_redemption_code(db, code.code, normalized_user_name)
        if use_result:
            response_body = StandardResponse()
            response_body.message = "Redemption code used successfully."
            response_body.data = {"code": code.code, "value": code_value}
            return response_body
    response_body = StandardResponse()
    response_body.retcode = response.status_code == 500
    response_body.message = "Failed to use redemption code. Contact admin. "
    return response_body
