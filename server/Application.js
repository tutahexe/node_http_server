import http from "node:http";
import { EventEmitter } from "node:events";

export class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.__createServer();
    this.middlewares = [];
  }

  use(middleware) {
    {
      this.middlewares.push(middleware);
    }
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  __createServer() {
    return http.createServer((req, res) => {
      let body = "";

      console.log("Incoming request:", req.url);
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        if (body) {
          try {
            req.body = JSON.parse(body);
          } catch (error) {
            console.error("Invalid JSON:", error);
            if (!res.headersSent) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Invalid JSON body" }));
            }
          }
        }

        this.middlewares.forEach((middleware) => middleware(req, res));
        const emitted = this.emitter.emit(
          this._getRouteMask(req.pathname, req.method),
          req,
          res
        );
        console.log("Route emitted:", emitted);
        if (!emitted) {
          res.end(JSON.stringify({ error: "404 Not Found" }));
        }
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}
