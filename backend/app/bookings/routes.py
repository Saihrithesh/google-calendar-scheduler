from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import SessionLocal
from app.bookings.models import Booking
from app.availability.models import Availability
from app.auth.dependencies import get_current_user

# ✅ ADD THIS IMPORT (ONLY ADDITION)
from app.google.calendar import create_meet_link

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def book_meeting(
    availability_id: int,
    slot: str,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    availability = db.query(Availability).filter(
        Availability.id == availability_id
    ).first()

    if not availability:
        raise HTTPException(status_code=404, detail="Availability not found")

    existing = db.query(Booking).filter(
        Booking.admin_id == availability.admin_id,
        Booking.date == availability.date,
        Booking.slot == slot
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Slot already booked")

    # ✅ REAL GOOGLE MEET LINK (ONLY FIX)
    meet_link = create_meet_link(
        user_email=user.email,
        date=str(availability.date),
        time=slot
    )

    booking = Booking(
        user_id=user.id,
        admin_id=availability.admin_id,
        date=availability.date,
        slot=slot,
        meet_link=meet_link
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking

@router.get("/my")
def my_bookings(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Booking).filter(
        Booking.user_id == user.id
    ).all()

@router.delete("/{booking_id}")
def cancel_booking(
    booking_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == user.id
    ).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    db.delete(booking)
    db.commit()
    return {"message": "Booking cancelled"}
