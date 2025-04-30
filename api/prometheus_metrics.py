import time, random
_metrics = {"requests_total": 0, "tasks_created": 0, "tasks_deleted": 0}
def inc_metric(name):
    _metrics[name] = _metrics.get(name, 0) + 1
def get_metrics():
    return _metrics.copy()
