from sqlalchemy import Boolean, Column, Integer, String, DateTime

from .database import Base


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


class PassportToken(Base):
    __tablename__ = "token"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, index=True)
    authority = Column(String, index=True)
