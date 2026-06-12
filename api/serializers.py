TASK_FIELDS = ["id", "title", "description", "status", "priority", "category", "due_date", "created_at", "updated_at"]


def serialize_task(task):
    return {k: task.get(k) for k in TASK_FIELDS}
