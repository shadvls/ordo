#!/bin/bash
set -e
if [ ! -d /tmp/ordo-data ]; then mkdir -p /tmp/ordo-data; fi
exec gunicorn api.index:app --bind 0.0.0.0:${PORT:-5000} --workers ${WORKERS:-2}
