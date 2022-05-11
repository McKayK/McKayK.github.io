const express = require("express");
const cors = require("cors");
const path = require("path");
// const process = require("dotenv");

// require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
// app.use(express.static(path.join(__dirname, "../node_modules")));

// app.use(
//   "/build/three.module.js",
//   express.static(
//     path.join(__dirname, "../node_modules/three/build/three.module.js")
//   )
// );

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/style.css"));
});

app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/main.js"));
});

const port = process.env.PORT || 4003;

app.listen(port, () => console.log(`Running on port ${port}`));
