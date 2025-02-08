import json
import os
import sys
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS

DATA_DIR = '/tmp/ordo-data'
DATA_FILE = os.path.join(DATA_DIR, 'tasks.json')

def _load():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return []

def _save(tasks):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(DATA_FILE, 'w') as f:
        json.dump(tasks, f, indent=2)

def all_tasks():
    return _load()

def get_task(task_id):
    for t in _load():
        if t['id'] == task_id:
            return t
    return None

def create_task(data):
    tasks = _load()
    task_id = 1
    if tasks:
        task_id = max(t['id'] for t in tasks) + 1
    now = datetime.utcnow().isoformat()
    task = {
        'id': task_id,
        'title': data.get('title', '').strip(),
        'description': data.get('description', ''),
        'status': data.get('status', 'pending'),
        'priority': data.get('priority', 0),
        'category': data.get('category', 'general'),
        'due_date': data.get('due_date', ''),
        'created_at': now,
        'updated_at': now,
    }
    tasks.append(task)
    _save(tasks)
    return task

def update_task(task_id, data):
    tasks = _load()
    for t in tasks:
        if t['id'] == task_id:
            for key in ('title', 'description', 'status', 'priority', 'category', 'due_date'):
                if key in data:
                    val = data[key]
                    if key == 'title':
                        val = val.strip()
                    t[key] = val
            t['updated_at'] = datetime.utcnow().isoformat()
            _save(tasks)
            return t
    return None

def toggle_task(task_id):
    tasks = _load()
    for t in tasks:
        if t['id'] == task_id:
            t['status'] = 'done' if t['status'] == 'pending' else 'pending'
            t['updated_at'] = datetime.utcnow().isoformat()
            _save(tasks)
            return t
    return None

def delete_task(task_id):
    tasks = _load()
    for i, t in enumerate(tasks):
        if t['id'] == task_id:
            removed = tasks.pop(i)
            _save(tasks)
            return removed
    return None

app = Flask(__name__)
CORS(app)

@app.route('/api/tasks', methods=['GET'])
def list_tasks():
    tasks = all_tasks()
    tasks.sort(key=lambda t: (-t['priority'], t['created_at']), reverse=True)
    limit = request.args.get('limit', type=int)
    offset = request.args.get('offset', default=0, type=int)
    if limit:
        tasks = tasks[offset:offset + limit]
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def create():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body is required'}), 400
    title = data.get('title', '').strip()
    if not title:
        return jsonify({'error': 'Title is required'}), 400
    if len(title) > 200:
        return jsonify({'error': 'Title must be 200 characters or fewer'}), 400
    task = create_task(data)
    return jsonify(task), 201

@app.route('/api/tasks/<int:task_id>', methods=['GET'])
def get(task_id):
    task = get_task(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify(task)

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update(task_id):
    task = get_task(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body is required'}), 400
    if 'title' in data:
        title = data['title'].strip()
        if not title:
            return jsonify({'error': 'Title cannot be empty'}), 400
        if len(title) > 200:
            return jsonify({'error': 'Title must be 200 characters or fewer'}), 400
    updated = update_task(task_id, data)
    return jsonify(updated)

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete(task_id):
    task = get_task(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    delete_task(task_id)
    return jsonify({'message': 'Task deleted'})

@app.route('/api/tasks/<int:task_id>/toggle', methods=['PATCH'])
def toggle(task_id):
    task = get_task(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    updated = toggle_task(task_id)
    return jsonify(updated)

@app.route('/api/health')
def health():
    return jsonify({'status': 'ok'})

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)
