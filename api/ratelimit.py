import time
from functools import wraps
from flask import jsonify, request
_requests = {}


def rate_limit(limit=100, window=60):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            ip = request.remote_addr
            now = time.time()
            _requests.setdefault(ip, []).append(now)
            _requests[ip] = [t for t in _requests[ip] if now - t < window]
            if len(_requests[ip]) > limit:
                return jsonify({"error": "Rate limit exceeded"}), 429
            return f(*args, **kwargs)
        return wrapper
    return decorator
