const express = require("express");
const shortid = "shortid";
const server = express();

server.use(express.json());

let users = [];

// GET

server.get("/", (req, res) => {
  res.json({ message: "Hello User!" });
});

//  POST

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
    }
});

//    GET

server.get("api/users", (req, res) => {
  const users = [
    {
      id: { shortid },
      name: "Mark Stahl",
      bio: "A bad programmer",
    },
    {
      id: { shortid },
      name: "Slenderman",
      bio: "???",
    },
  ];
 res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    user.findById(id)
      .then(user => {
        if (user) {
         res.status(200).json(user);
      } else {
         res
         .status(404)
         .json({ error: "The user with the specified ID does not exist." })
      }
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: "The user information could not be found."})
    });
});

//  UPDATE

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id) {
      res.status(404).json({ error: "The user information could not be retrieved." });
  } else if (!changes.name || !changes.bio) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  } else {
      db.update(id, changes)
          .then(user => {
              res.status(201).json({ message: `Updated` });
          })
          .catch(err => {
              res.status(500).json({ error: "The user information could not be modified." });
          });
  }
})


//  DELETE

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const found = users.find((users) => users.id === id);
  if (found) {
    users = users.filter((users) => users.id !== id);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});