from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from . import models, schemas


def add_passport_token(db: Session, token: schemas.PassportToken) -> models.PassportToken | bool:
    db_token = models.PassportToken(**token.dict())
    # Check exists and add
    token_exists = db.query(models.PassportToken).filter(models.PassportToken.token == token.token).first()
    if token_exists:
        return False
    db.add(db_token)
    db.commit()
    db.refresh(db_token)
    return db_token


def update_passport_token_by_authority(db: Session, token: schemas.PassportToken):
    db.query(models.PassportToken).filter(models.PassportToken.authority == token.authority).update(
        {models.PassportToken.token: token.token})
    db.commit()
    return True


def validate_passport_token(db: Session, token: str) -> models.PassportToken | None:
    return db.query(models.PassportToken).filter(models.PassportToken.token == token).first()


def validate_redemption_code(db: Session, code: str) -> models.RedemptionCode | None:
    return db.query(models.RedemptionCode).filter(and_(models.RedemptionCode.code == code,
                                                       models.RedemptionCode.used == False)).first()


def add_redemption_code(db: Session, code: schemas.RedemptionCode) -> models.RedemptionCode | bool:
    db_code = models.RedemptionCode(**code.dict())
    # Check exists and add
    code_exists = db.query(models.RedemptionCode).filter(models.RedemptionCode.code == code.code).first()
    if code_exists:
        return False
    db.add(db_code)
    db.commit()
    db.refresh(db_code)
    return db_code


def add_redemption_code_list(db: Session, codes: list[schemas.RedemptionCode]) -> list[models.RedemptionCode]:
    db_codes = [models.RedemptionCode(**code.dict()) for code in codes]
    db.add_all(db_codes)
    db.commit()
    return db_codes
