from pydantic import BaseModel, Field
from typing import Optional
import datetime


class StandardResponse(BaseModel):
    retcode: int = 0
    message: str = "ok"
    data: Optional[dict | list | None] = None


class RedemptionCode(BaseModel):
    code: str
    value: int
    used: Optional[bool] = False
    description: str
    created_by: str
    created_datetime: datetime.datetime
    used_by: Optional[str] = None
    used_datetime: Optional[datetime.datetime | None] = None


class RedemptionToken(BaseModel):
    token: str = Field(description="Redemption token value")
    authority: str = Field(description="Authority represented by the token, e.g. localization dept, etc.")


class HomaUserInfo(BaseModel):
    IsMaintainer: bool
    NormalizedUserName: str
