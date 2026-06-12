from flask import request


def accepts_json():
    best = request.accept_mimetypes.best_match(["application/json", "text/html"])
    return best == "application/json" or request.is_json
