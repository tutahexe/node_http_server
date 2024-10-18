import { Application } from "./server/Application.js";
import { router as userRouter } from "./src/user-router.js";
import { parserJson } from "./server/jsonParser.js";
import { parserUrl } from "./server/urlParser.js";
const PORT = 5001;

const app = new Application();

app.addRouter(userRouter);
app.use(parserJson);
app.use(parserUrl(`http://localhost:${PORT}`));

app.listen(PORT, () => console.log("server started"));
