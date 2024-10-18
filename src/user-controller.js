const users = [{ id: 0, name: "kek" }];

export const getUsers = (req, res) => {
  if (req.params.id) {
    return res.send(users.find((user) => user.id == req.params.id));
  }
  res.send(users);
};

export const createUser = (req, res) => {
  const user = req.body;
  users.push(user);
  res.send(user);
};
