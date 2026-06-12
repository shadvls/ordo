from datetime import datetime

TASK_KEYS = ("title", "description", "status", "priority", "category", "due_date")


def new_task(data):
    return {
        "id": data.get("id"),
        "title": (data.get("title") or "").strip(),
        "description": data.get("description", ""),
        "status": data.get("status", "pending"),
        "priority": int(data.get("priority", 0)),
        "category": data.get("category", "general"),
        "due_date": data.get("due_date", ""),
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
