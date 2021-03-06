const express = require("express");

const server = express();

server.use(express.json());

let count = 0;

const projects = [
  { id: "0", title: "Projeto 1", tasks: ["Task1"] },
  { id: "1", title: "Projeto 2", tasks: ["Task1", "Task2"] },
  { id: "2", title: "Projeto 3", tasks: [] }
];

function checkIdMiddleware(req, res, next) {
  const { id } = req.params;

  if (!checkProjectID(id)) {
    return res.status(400).json({ error: "Id not found" });
  }

  next();
}

function countReqMiddleware(req, res, next) {
  count++;
  console.log(count);

  next();
}

function checkProjectID(id) {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      return true;
    }
  }

  return false;
}

function updateProject(id, title) {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projects[i].title = title;
    }
  }
}

function deleteProject(id) {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projects.splice(i, 1);
    }
  }
}

function updateTask(id, task) {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projects[i].tasks.push(task);
    }
  }
}

server.get("/projects", countReqMiddleware, (req, res) => {
  res.json(projects);
});

server.post("/projects", countReqMiddleware, (req, res) => {
  const { id, title } = req.body;

  if (checkProjectID(id)) {
    return res.status(400).json({ error: "id already in use" });
  } else {
    projects.push({ id, title, tasks: [] });
    return res.json(projects);
  }
});

server.put(
  "/projects/:id",
  countReqMiddleware,
  checkIdMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    updateProject(id, title);

    return res.json(projects);
  }
);

server.delete(
  "/projects/:id",
  countReqMiddleware,
  checkIdMiddleware,
  (req, res) => {
    const { id } = req.params;

    deleteProject(id);

    return res.json(projects);
  }
);

server.post(
  "/projects/:id/tasks",
  countReqMiddleware,
  checkIdMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    updateTask(id, title);

    return res.json(projects);
  }
);

server.listen(3000, () => {
  console.log("Server Listening on http://localhost:3000");
});
