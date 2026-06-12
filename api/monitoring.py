import time

_request_times = []


def record_request(response):
    _request_times.append(time.time())
    if len(_request_times) > 1000:
        _request_times.pop(0)
    return response


def avg_response_time():
    return 0
