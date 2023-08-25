const express = require("express");
const {
  validationLogin,
  validationGetUser,
  validationUpdate,
  validationDelete,
} = require("./middleware");
const { login, getUser, updateUser, deleteUser } = require("./controller");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/user/:id", validationGetUser, getUser);
app.post("/user", validationLogin, login);
app.put("/user/:id", validationUpdate, updateUser);
app.delete("/user/:id", validationDelete, deleteUser);

app.listen(port, () => {
  console.log(`server :  http://localhost:${port}`);
});
