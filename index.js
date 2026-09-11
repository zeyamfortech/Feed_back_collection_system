const express = require("express");

app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

//if we used deployment(heroku) environment use first and if we are using the development  environment default used 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT);
