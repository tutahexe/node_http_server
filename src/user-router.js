import { Router } from "../server/Router.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../src/user-controller.js";

export const router = new Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users", updateUser);
router.delete("/users", deleteUser);
