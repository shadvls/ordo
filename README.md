# Ordo

> A simple task manager built with Flask and Backbone.js.

Keep track of your daily tasks with a clean, responsive interface. Ordo lets you organize tasks by category and priority, toggle completion status, and track your progress at a glance.

## Tech Stack

- **Backend:** Flask (Python) + SQLAlchemy + SQLite
- **Frontend:** Backbone.js + Handlebars + jQuery
- **Styling:** Bootstrap 3 + Font Awesome

## Getting Started

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

Open http://localhost:5000 in your browser.

## API Endpoints

| Method | Endpoint              | Description       |
|--------|-----------------------|-------------------|
| GET    | `/api/tasks`          | List all tasks    |
| POST   | `/api/tasks`          | Create a task     |
| GET    | `/api/tasks/:id`      | Get a task        |
| PUT    | `/api/tasks/:id`      | Update a task     |
| PATCH  | `/api/tasks/:id/toggle` | Toggle status  |
| DELETE | `/api/tasks/:id`      | Delete a task     |

## License

MIT
