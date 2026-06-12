def required_keys(data, keys):
    missing = [k for k in keys if not data.get(k)]
    if missing:
        return "Missing required fields: " + ", ".join(missing)
    return None
