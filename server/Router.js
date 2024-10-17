export class Router {
  constructor() {
    this.endpoints = {};
  }

  request(method = "GET", path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error(`${method}${path}Aready exist`);
    }

    endpoint[method] = handler;
  }

  get(path, handler) {
    this.request("GET", path, handler);
  }
}
