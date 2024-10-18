export const parserUrl = (baseUrl) => (req, res) => {
  const parsedFullUrl = new URL(req.url, baseUrl);
  const params = {};
  console.log(baseUrl);
  console.log(parsedFullUrl);
  parsedFullUrl.searchParams.forEach((value, key) => (params[key] = value));
  console.log(params);
  req.pathname = parsedFullUrl.pathname;
  req.params = params;
};
