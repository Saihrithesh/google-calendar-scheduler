from sqlalchemy import Column, Integer, String
from app.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, index=True)
    admin_id = Column(Integer, index=True)
    date = Column(String, index=True)
    slot = Column(String)
    meet_link = Column(String)
