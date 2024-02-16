import datetime
from typing import Optional

from pydantic import BaseModel, Field


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
    created_datetime: datetime.datetime = datetime.datetime.now()
    used_by: Optional[str] = None
    used_datetime: Optional[datetime.datetime | None] = None


class PassportTokenPublic(BaseModel):
    Authority: str | None = Field(description="Authority represented by the token, class specifically used to passing "
                                              "in network")


class PassportToken(PassportTokenPublic):
    token: str = Field(description="Redemption token value")
    authority: str = Field(description="Authority represented by the token, e.g. localization dept, etc.; Only used by "
                                       "internal functions")


class HomaUserInfo(BaseModel):
    IsMaintainer: bool
    NormalizedUserName: str | None


class NewRedemptionCodeRequest(BaseModel):
    code: list[str]
    value: int
    description: str
