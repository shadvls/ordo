# Ordo - Premium Task Manager

A modern, feature-rich task management application built with Flask and Backbone.js.

- Real-time task CRUD operations
- Category and priority management
- Dark mode with system preference detection
- Keyboard shortcuts and command palette
- Animations powered by GSAP
- Docker and Vercel deployment support

## Tech Stack
- **Backend**: Flask (Python) + JSON file storage
- **Frontend**: Backbone.js + Handlebars + jQuery
- **Styling**: Tailwind CSS + Font Awesome 6
- **Animations**: GSAP (GreenSock Animation Platform)
- **Deployment**: Docker / Vercel / Gunicorn

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | List all tasks |
| POST | /api/tasks | Create a task |
| GET | /api/tasks/:id | Get a task |
| PUT | /api/tasks/:id | Update a task |
| PATCH | /api/tasks/:id/toggle | Toggle status |
| DELETE | /api/tasks/:id | Delete a task |
| GET | /api/health | Health check |
## Quick Start

```bash
pip install -r requirements.txt
python api/index.py
```

### Docker
```bash
docker compose up -d
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Server port |
| FLASK_ENV | production | Environment |
| ORDO_DATA_DIR | /tmp/ordo-data | Data path |

## Testing

```bash
pytest tests/ --cov=api/
```

## License

MIT
