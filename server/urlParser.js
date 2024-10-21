export const parserUrl = (baseUrl) => (req, res) => {
  const parsedFullUrl = new URL(req.url, baseUrl);
  const params = {};
  parsedFullUrl.searchParams.forEach((value, key) => (params[key] = value));
  req.pathname = parsedFullUrl.pathname;
  req.params = params;
};
