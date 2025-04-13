from datetime import datetime
def test_date_parsing():
    date_str = "2025-04-13"
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    assert dt.year == 2025
    assert dt.month == 4
    assert dt.day == 13
