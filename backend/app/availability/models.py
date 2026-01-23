from sqlalchemy import Column, Integer, String
from app.database import Base

class Availability(Base):
    __tablename__ = "availability"

    id = Column(Integer, primary_key=True)
    admin_id = Column(Integer, index=True)
    date = Column(String, index=True)          # YYYY-MM-DD
    start_time = Column(String)                # HH:MM
    end_time = Column(String)                  # HH:MM
