import uuid
from flask import g


def get_request_id():
    if "request_id" not in g:
        g.request_id = str(uuid.uuid4())[:8]
    return g.request_id
