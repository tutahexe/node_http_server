import { Router } from "../server/Router.js";

export const router = new Router();

const users = [{ id: 0, name: "kek" }];

router.get("/users", (req, res) => {
  res.writeHead(200, {
    "Content-type": "application/json",
  });
  res.end(JSON.stringify(users));
});
