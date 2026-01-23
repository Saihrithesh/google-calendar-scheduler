import sqlite3

conn = sqlite3.connect("scheduler.db")
cursor = conn.cursor()

cursor.execute("SELECT id, admin_id, date, start_time, end_time FROM availability")
rows = cursor.fetchall()

print("AVAILABILITY ROWS:")
for row in rows:
    print(row)

conn.close()
