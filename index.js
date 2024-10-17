import { Application } from "./server/Application.js";
import { router as userRouter } from "./src/user-router.js";
import { parserJson } from "./server/jsonParser.js";
const PORT = 5001;

const app = new Application();

app.addRouter(userRouter);
app.use(parserJson);

app.listen(PORT, () => console.log("server started"));
