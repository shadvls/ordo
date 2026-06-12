import hashlib
import json


def generate_etag(data):
    return hashlib.md5(json.dumps(data, sort_keys=True).encode()).hexdigest()
