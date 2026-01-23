from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import csv
import io
import pandas as pd

from app.database import SessionLocal
from app.bookings.models import Booking
from app.auth.dependencies import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/csv")
def download_csv(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role.strip().upper() != "ADMIN":
        raise HTTPException(status_code=403, detail="Only admin allowed")

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "User ID", "Admin ID", "Date", "Slot", "Meet Link"])

    bookings = db.query(Booking).all()
    for b in bookings:
        writer.writerow([b.id, b.user_id, b.admin_id, b.date, b.slot, b.meet_link])

    output.seek(0)
    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=bookings.csv"}
    )

@router.get("/excel")
def download_excel(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role.strip().upper() != "ADMIN":
        raise HTTPException(status_code=403, detail="Only admin allowed")

    bookings = db.query(Booking).all()
    data = [{
        "ID": b.id,
        "User ID": b.user_id,
        "Admin ID": b.admin_id,
        "Date": b.date,
        "Slot": b.slot,
        "Meet Link": b.meet_link
    } for b in bookings]

    df = pd.DataFrame(data)
    output = io.BytesIO()
    df.to_excel(output, index=False)
    output.seek(0)

    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=bookings.xlsx"}
    )
