export const parserJson = (req, res) => {
  res.send = (data) => {
    res.end(JSON.stringify(data));
  };
};
