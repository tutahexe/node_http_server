import { Router } from "../server/Router.js";
import { getUsers, createUser } from "../src/user-controller.js";

export const router = new Router();

router.get("/users", getUsers);

router.post("/users", createUser);

router.put("/users", (req, res) => {});

router.delete("/users", (req, res) => {
  console.log(req.body);
  const user = req.body;
  users.push(user);
  res.send(user);
});
