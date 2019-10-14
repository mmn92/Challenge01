# GoStack Challenge 01

This is a backend project made using Nodejs and Express.

## Routes

- `GET` `/projects` : Lists all the projects

- `POST` `/projects` : Creates a new project with the `id` and `title` sent in request body

- `POST` `/projects/:id/tasks` : Creates a new task in the project with the `id` in request params

- `PUT` `/projects/:id` : Updates the title of the project with `id` in request params with `title` in request body

- `DELETE` `/projects/:id` : Deletes the project with `id` passed in request params
