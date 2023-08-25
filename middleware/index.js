const datas = require("../models");
const logger = require("./logger");

const validationLogin = async (req, res, next) => {
  const { name } = req.query;

  const User = await datas;

  const find = User.find(
    (user) =>
      user.name.toString().toLowerCase() === name.toString().toLowerCase()
  );

  if (!find) {
    logger.info(`User Not Found`);
    return res.status(404).json({ message: "User Not Found" });
  }
  next();
};

const validationGetUser = async (req, res, next) => {
  const id = req.params.id;
  const User = await datas;

  const find = User.find(
    (user) => user.id.toString().toLowerCase() === id.toString().toLowerCase()
  );
  if (!find) {
    logger.info(`User id ${id} Not Found`);
    return res.status(404).json({ message: `User id ${id} Not Found` });
  }

  next();
};

const validationUpdate = async (req, res, next) => {
  const { name, age, location, language } = req.query;
  const id = req.params.id;

  const User = await datas;
  const find = User.find(
    (user) => user.id.toString().toLowerCase() === id.toString().toLowerCase()
  );

  if (!find) {
    logger.info(`User id ${id} Not Found`);
    return res.status(404).json({ message: `User id ${id} Not Found` });
  }

  if (!isNaN(Number(name))) {
    logger.info(`name can only contain strings`);
    return res.status(400).json({ message: "name can only contain strings" });
  }

  if (isNaN(Number(age))) {
    logger.info(`age can only contain number`);
    return res.status(400).json({ message: "age can only contain number" });
  }

  if (!isNaN(Number(language))) {
    logger.info(`language can only contain strings`);
    return res
      .status(400)
      .json({ message: "language can only contain strings" });
  }

  next();
};

const validationDelete = async (req, res, next) => {
  const id = req.params.id;
  const { nama } = req.query;

  const User = await datas;
  const findUser = User.find(
    (user) => user.id.toString().toLowerCase() === id.toString().toLowerCase()
  );

  const findRole = User.find(
    (user) =>
      user.name.toString().toLowerCase() === nama.toString().toLowerCase()
  );

  if (!findUser) {
    logger.info(`User Not Found`);
    return res.status(400).json({ message: "User Not Found" });
  } else if (!findRole) {
    logger.info(`User name ${nama} Not Found`);
    return res.status(404).json({ message: `User name ${nama} Not Found` });
  } else if (findRole.role === "user") {
    logger.info(`Unautorize`);
    return res.status(401).json({ message: "Unautorize" });
  }

  next();
};

module.exports = {
  validationLogin,
  validationGetUser,
  validationUpdate,
  validationDelete,
};
