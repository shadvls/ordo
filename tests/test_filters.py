def test_filter_by_category():
    tasks = [
        {"category": "work"},
        {"category": "personal"},
        {"category": "work"}
    ]
    work = [t for t in tasks if t["category"] == "work"]
    assert len(work) == 2
