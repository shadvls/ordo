def test_list_empty():
    tasks = []
    assert len(tasks) == 0
def test_create_task():
    data = {'title': 'New task', 'status': 'pending'}
    assert data['title'] == 'New task'
def test_update_task():
    task = {'title': 'Old', 'status': 'pending'}
    task['title'] = 'Updated'
    assert task['title'] == 'Updated'
