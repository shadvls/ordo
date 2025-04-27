#!/bin/bash
aws s3 cp /tmp/ordo-data/tasks.json s3://ordo-backups/tasks-$(date +%Y%m%d).json
