const express = require("express");

const server = express();

const projects = [
  { id: "0", title: "Projeto 1", tasks: ["Task1"] },
  { id: "1", title: "Projeto 2", tasks: ["Task1", "Task2"] },
  { id: "2", title: "Projeto 3", tasks: [] }
];

server.get("/projects", (req, res) => {
  res.json(projects);
});

server.listen(3000);
