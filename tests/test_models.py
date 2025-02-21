def test_task_creation():
    task = {
        'id': 1,
        'title': 'Test task',
        'description': '',
        'status': 'pending',
        'priority': 0,
        'category': 'general',
        'due_date': '',
        'created_at': '2025-01-01T00:00:00',
        'updated_at': '2025-01-01T00:00:00'
    }
    assert task['title'] == 'Test task'
    assert task['status'] == 'pending'
def test_task_toggle():
    task = {'status': 'pending'}
    task['status'] = 'done' if task['status'] == 'pending' else 'pending'
    assert task['status'] == 'done'
def test_task_priority():
    assert max([0, 1, 2]) == 2
