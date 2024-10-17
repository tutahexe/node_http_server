import { Router } from "./server/Router.js";
import { Application } from "./server/Application.js";

const PORT = 5001;

const app = new Application();

const rounter = new Router();

rounter.get("/users", (req, res) => {
  res.end("Req was send to /users");
});

app.addRouter(rounter);

app.listen(PORT, () => console.log("server started"));
