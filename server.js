const express = require("express");

const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.resolve(__dirname, "./build")));

// eslint-disable-next-line func-names
app.get("*", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
