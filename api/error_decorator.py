def api_error(status_code=400):
    def decorator(f):
        from functools import wraps

        @wraps(f)
        def wrapper(*args, **kwargs):
            result = f(*args, **kwargs)
            if isinstance(result, tuple):
                data, code = result
                if code >= 400:
                    return {"error": data.get("error", "Unknown error")}, code
            return result
        return wrapper
    return decorator
