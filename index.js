import { Application } from "./server/Application.js";
import { router as userRouter } from "./src/user-router.js";
const PORT = 5001;

const app = new Application();

app.addRouter(userRouter);

app.listen(PORT, () => console.log("server started"));
