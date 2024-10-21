import { Application } from "./server/Application.js";
import { router as userRouter } from "./src/user-router.js";
import { parserJson } from "./server/jsonParser.js";
import { parserUrl } from "./server/urlParser.js";
import cluster from "node:cluster";
import os from "os";

const PORT = process.env.PORT;

const createServer = (port) => {
  const app = new Application();

  app.addRouter(userRouter);
  app.use(parserJson);
  app.use(parserUrl(`http://localhost:${PORT}`));

  app.listen(PORT, () => console.log(`server started on ${PORT}`));
};
if (process.env.CLUSTER_MODE && cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs - 1; i++) {
    let worker = cluster.fork();
    console.log(`Started ${i} worker with ${worker.process.pid} PID`);
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} closed`);
  });
} else {
  createServer(PORT);
}
