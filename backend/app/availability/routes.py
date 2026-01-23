from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database import SessionLocal
from app.availability.models import Availability
from app.bookings.models import Booking
from app.auth.dependencies import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ADMIN creates availability
@router.post("/")
def create_availability(
    date: str,
    start_time: str,
    end_time: str,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role.strip().upper() != "ADMIN":
        raise HTTPException(status_code=403, detail="Only admin allowed")

    availability = Availability(
        admin_id=user.id,
        date=date,
        start_time=start_time,
        end_time=end_time
    )

    db.add(availability)
    db.commit()

    return {"message": "Availability created"}


# USER checks availability (NO admin_id)
@router.get("/check")
def check_availability(
    date: str,
    db: Session = Depends(get_db)
):
    availability = db.query(Availability).filter(
        Availability.date == date
    ).first()

    if not availability:
        return {"availability_id": None, "slots": []}

    start = datetime.strptime(availability.start_time, "%H:%M")
    end = datetime.strptime(availability.end_time, "%H:%M")

    all_slots = []
    while start < end:
        all_slots.append(start.strftime("%H:%M"))
        start += timedelta(minutes=30)

    booked = db.query(Booking.slot).filter(
        Booking.admin_id == availability.admin_id,
        Booking.date == availability.date
    ).all()

    booked_slots = {b.slot for b in booked}

    free_slots = [s for s in all_slots if s not in booked_slots]

    return {
        "availability_id": availability.id,
        "slots": free_slots
    }
