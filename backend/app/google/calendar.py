from datetime import datetime, timedelta
from app.utils.google_auth import get_calendar_service
import re

def create_meet_link(user_email, date, time, duration=30):
    service = get_calendar_service()

    start = datetime.fromisoformat(f"{date}T{time}")
    end = start + timedelta(minutes=duration)

    # ✅ simple email validation
    email_valid = (
        isinstance(user_email, str)
        and re.match(r"[^@]+@[^@]+\.[^@]+", user_email)
    )

    event = {
        "summary": "Scheduled Meeting",
        "description": "Meeting booked via Scheduler",
        "start": {
            "dateTime": start.isoformat(),
            "timeZone": "Asia/Kolkata",
        },
        "end": {
            "dateTime": end.isoformat(),
            "timeZone": "Asia/Kolkata",
        },
        "conferenceData": {
            "createRequest": {
                "requestId": f"meet-{start.timestamp()}",
                "conferenceSolutionKey": {"type": "hangoutsMeet"},
            }
        },
    }

    # ✅ add attendees ONLY if email is valid
    if email_valid:
        event["attendees"] = [{"email": user_email}]

    created_event = service.events().insert(
        calendarId="primary",
        body=event,
        conferenceDataVersion=1,
        sendUpdates="all",
    ).execute()

    return created_event["hangoutLink"]
