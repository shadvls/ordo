import os


class Config:
    DATA_DIR = os.environ.get("ORDO_DATA_DIR", "/tmp/ordo-data")
    DEBUG = os.environ.get("FLASK_ENV") == "development"
    PORT = int(os.environ.get("PORT", 5000))
