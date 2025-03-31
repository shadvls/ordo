from flask_cors import CORS
def init_cors(app):
    CORS(app, resources={r"/api/*": {"origins": "*"}}, expose_headers=["ETag", "Content-Type"])
    return app
