import http from "node:http";
import { EventEmitter } from "node:events";

export class Application {
  constructor() {
    this.emmiter = new EventEmitter();
    this.server = this.__createServer();
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        this.emmiter.on(this._getRouteMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  __createServer() {
    return http.createServer((req, res) => {
      const emmited = this.emmiter.emit(
        this._getRouteMask(req.url, req.method),
        req,
        res
      );
      if (!emmited) {
        res.end();
      }
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}
