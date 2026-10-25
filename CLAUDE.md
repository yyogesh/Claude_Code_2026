# To-do API

A small REST API for a to-do app. Express 5, ES modules, data in memory.

## Commands
- Install: npm install
- Test: npm test
- Run: npm start (port 3000)

## Layout
- src/app.js: creates the Express app
- src/todos.js: all /todos routes
- tests/: Vitest + supertest tests, one describe block per route

## Rules
- Every new or changed route needs a test in tests/todos.test.js.
- Errors return JSON { "error": "<message>" } with a 4xx status.
- Add one line to CHANGELOG.md under "Unreleased" for every change.
- Never add a new npm package without asking me first.
- Run npm test before you say a task is done.