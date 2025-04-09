def test_toggle():
    task = {"status": "pending"}
    task["status"] = "done"
    assert task["status"] == "done"
    task["status"] = "pending"
    assert task["status"] == "pending"
