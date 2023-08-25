const logger = require("../middleware/logger");
const datas = require("../models");

const login = async (req, res) => {
  const { name } = req.query;

  const User = await datas;

  const find = User.find(
    (user) =>
      user.name.toString().toLowerCase() === name.toString().toLowerCase()
  );

  const userData = {};
  userData.name = find.name;
  userData.age = find.age;
  userData.location = find.location;
  userData.lenguage = find.language;

  res.status(200).json(userData);
  logger.info(userData);
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const User = await datas;

  const find = User.find(
    (user) => user.id.toString().toLowerCase() === id.toString().toLowerCase()
  );
  logger.info(find);
  return res.status(200).json(find);
};

const updateUser = async (req, res) => {
  const { name, age, location, language } = req.query;

  const id = req.params.id;

  const User = await datas;
  const find = User.find(
    (user) => user.id.toString().toLowerCase() === id.toString().toLowerCase()
  );

  const update = {};

  update.name = name || find.name;
  update.age = age || find.age;
  update.location = location || find.location;
  update.language = language || find.language;

  logger.info(update);
  res.status(200).json(update);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const User = await datas;
  const findUser = User.filter(
    (user) => user.id.toString().toLowerCase() !== id.toString().toLowerCase()
  );

  logger.info(findUser);
  res.status(200).json(findUser);
};

module.exports = { login, getUser, updateUser, deleteUser };
