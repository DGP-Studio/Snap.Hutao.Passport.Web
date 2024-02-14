from .database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, DateTime


class RedemptionCode(Base):
    __tablename__ = "redemption_exchangeable"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, index=True)
    value = Column(Integer, index=True)
    used = Column(Boolean, default=False)
    description = Column(String, index=True)
    created_by = Column(String, index=True)
    created_datetime = Column(DateTime, index=True)
    used_by = Column(String, index=True)
    used_datetime = Column(DateTime, index=True, nullable=True)


class RedemptionToken(Base):
    __tablename__ = "redemption_token"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, index=True)
    authority = Column(String, index=True)
