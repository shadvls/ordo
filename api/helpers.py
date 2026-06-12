import json
import os
from datetime import datetime
DATA_DIR = '/tmp/ordo-data'
DATA_FILE = os.path.join(DATA_DIR, 'tasks.json')


def load_tasks():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE) as f:
            return json.load(f)
    except BaseException:
        return []


def save_tasks(tasks):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(DATA_FILE, 'w') as f:
        json.dump(tasks, f, indent=2)


def now_iso():
    return datetime.utcnow().isoformat()
