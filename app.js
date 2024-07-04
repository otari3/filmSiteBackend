const expres = require("express");
const app = expres();
const mongoose = require("mongoose");
const moveisRouter = require("./router/moves");
const bodyParser = require("body-parser");
const auth = require("./router/auth");
const helmet = require("helmet");
app.use((req, res, next) => {
  res.setHeader("Access-control-Allow-Origin", "*");
  res.setHeader("Access-control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-control-Allow-Headers", "*");
  next();
});
app.use(helmet());
app.use(bodyParser.json());
app.use(moveisRouter);
app.use(auth);
mongoose
  .connect(
    "mongodb+srv://otikonozadze:tvali333@cluster0.2ss1jqf.mongodb.net/filmdb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    throw err;
  });
