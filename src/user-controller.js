import { v4 as uuidv4, validate as isUuidValid } from "uuid";
const users = [
  { id: 0, name: "kek" },
  {
    id: "244b75d1-917c-4989-9680-118415c28377",
    username: "JaneDoe2Updatessssd2",
    age: 28,
    hobbies: ["painting", "codin2g2"],
  },
];

export const getUsers = (req, res) => {
  try {
    const uuid = req.params.id;
    if (uuid) {
      if (!isUuidValid(uuid)) {
        send400(req, res);
      } else {
        const user = users.find((user) => user.id == req.params.id);
        if (!user) {
          send404(req, res);
        } else {
          return res.send(user);
        }
      }
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.send(users);
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const createUser = (req, res) => {
  try {
    console.log("create user is called");
    const { username, age, hobbies } = req.body;

    if (!username || !age || !Array.isArray(hobbies)) {
      send400(req, res);
    }

    const newUser = {
      id: uuidv4(),
      username,
      age,
      hobbies,
    };

    users.push(newUser);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.send(JSON.stringify(newUser));
  } catch (error) {
    handleError(res, error);
  }
};

export const updateUser = (req, res) => {
  try {
    const uuid = req.params.id;
    if (uuid) {
      if (!isUuidValid(uuid)) {
        send400(req, res);
      } else {
        const { username, age, hobbies } = req.body;
        if (!username || !age || !Array.isArray(hobbies)) {
          send400(req, res);
        }
        let user = users.find((user) => user.id == uuid);
        if (!user) {
          send404(req, res);
        } else {
          user.username = username;
          user.age = age;
          user.hobbies = hobbies;

          users.push(user);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.send(JSON.stringify(user));
        }
      }
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteUser = (req, res) => {
  try {
    const uuid = req.params.id;
    if (uuid) {
      if (!isUuidValid(uuid)) {
        send400(req, res);
      } else {
        let user = users.find((user) => user.id == uuid);
        if (!user) {
          send404(req, res);
        } else {
          const index = users.indexOf(user);
          users.splice(index, 1);
          res.writeHead(204, { "Content-Type": "application/json" });
          res.send(JSON.stringify(user));
        }
      }
    }
  } catch (error) {
    handleError(res, error);
  }
};

const send400 = (req, res) => {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.send(`Not valid uuid ${req.params.id}`);
};

const send404 = (req, res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.send(`No user with id ${req.params.id}`);
};

const handleError = (res, error) => {
  console.error("Server Error:", error);
  res.statusCode = 500;
  res.end(JSON.stringify({ message: "Internal Server Error" }));
};
