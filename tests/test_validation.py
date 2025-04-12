def test_title_validation():
    title = ""
    assert not title.strip()
    title = "Valid title"
    assert title.strip()
    title = "A" * 250
    assert not (0 < len(title) <= 200)
