from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.auth.routes import router as auth_router
from app.availability.routes import router as availability_router
from app.bookings.routes import router as booking_router
from app.reports.routes import router as reports_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Google Calendar Scheduler")

# 🔥 CORS CONFIG (DEV)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(availability_router, prefix="/availability", tags=["Availability"])
app.include_router(booking_router, prefix="/bookings", tags=["Bookings"])
app.include_router(reports_router, prefix="/reports", tags=["Reports"])
