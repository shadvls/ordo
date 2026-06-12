# Contribution Guide

Thank you for your interest in contributing to Ordo! Your contributions help make this task manager better. Here are some guidelines to get started.

## How to Contribute

1. Fork this repository:
   - Click the `Fork` button at the top of this repository page.
2. Clone the forked repository to your local machine.
   ```bash
   git clone https://github.com/shadvls/ordo.git
   ```
3. Create a new branch
   - Create a new branch for the feature or fix you want to add.
   ```
   cd ordo
   git checkout -b your-branch-name
   ```
   - Use a descriptive branch name that reflects the feature or fix you are working on.
4. Make the necessary changes:
   - Add or modify your code.
5. Commit your changes:
   - Make sure to write a clear and descriptive commit message.
   ```
   git add .
   git commit -m "Brief description of the changes you made"
   ```
6. Push to your repository:
   - Push your branch to your GitHub repository.
   ```
   git push origin your-branch-name
   ```
7. Create a Pull Request (PR):
   - Go to the original repository page and create a pull request from your branch.
   - Provide a clear description of what you added or fixed in your pull request.

## Coding Guidelines

- **Backend (Python/Flask):** Follow PEP 8. Run `flake8 api/` before committing.
- **Frontend (Backbone.js):** Keep logic in views, templates in Handlebars, animations via GSAP.
- **Style:** Use Tailwind utility classes; avoid custom CSS where possible.
- **Tests:** Add or update tests in `tests/`. Run `pytest tests/` to verify.
- **Commits:** Use conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).

## Reporting Issues

If you find any bugs or have suggestions for improvements, please create a new issue on the Issues page.

## Communication

If you want to discuss something related to your contribution or the project in general, feel free to reach out to us via [Discussions](https://github.com/shadvls/ordo/discussions) or email [yansha@yansha.dev](mailto:yansha@yansha.dev).

<br>
Thank you for your contribution!
