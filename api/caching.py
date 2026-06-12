

def cache_control(response, max_age=300):
    response.headers["Cache-Control"] = f"public, max-age={max_age}"
    return response
