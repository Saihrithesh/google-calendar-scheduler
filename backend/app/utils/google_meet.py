import uuid
import os
from datetime import datetime, timedelta
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
CREDENTIALS_DIR = os.path.join(BASE_DIR, "credentials")
TOKEN_FILE = os.path.join(CREDENTIALS_DIR, "token.json")

SCOPES = ["https://www.googleapis.com/auth/calendar"]

def create_google_meet(purpose: str, start_time: datetime):
    creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    service = build("calendar", "v3", credentials=creds)

    end_time = start_time + timedelta(minutes=30)

    event = {
        "summary": purpose,
        "start": {
            "dateTime": start_time.isoformat(),
            "timeZone": "Asia/Kolkata",
        },
        "end": {
            "dateTime": end_time.isoformat(),
            "timeZone": "Asia/Kolkata",
        },
        "conferenceData": {
            "createRequest": {
                "requestId": str(uuid.uuid4())
            }
        },
    }

    created_event = service.events().insert(
        calendarId="primary",
        body=event,
        conferenceDataVersion=1,
    ).execute()

    return created_event.get("hangoutLink")
