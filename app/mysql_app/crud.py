from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from datetime import date, timedelta
from . import models, schemas


def add_redemption_token(db: Session, token: schemas.RedemptionToken) -> models.RedemptionToken | bool:
    db_token = models.RedemptionToken(**token.dict())
    # Check exists and add
    token_exists = db.query(models.RedemptionToken).filter(models.RedemptionToken.token == token.token).first()
    if token_exists:
        return False
    db.add(db_token)
    db.commit()
    db.refresh(db_token)
    return db_token


def update_redemption_token_by_authority(db: Session, token: schemas.RedemptionToken):
    db.query(models.RedemptionToken).filter(models.RedemptionToken.authority == token.authority).update(
        {models.RedemptionToken.token: token.token})
    db.commit()
    return True


def validate_redemption_token(db: Session, token: str):
    return db.query(models.RedemptionToken).filter(models.RedemptionToken.token == token).first()
