const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../template/views"));
hbs.registerPartials(path.join(__dirname, "../template/partials"));

app.get("", (req, res) => {
  res.render("index", {
    title: "show",
    name: "André",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "André",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Are you really asking for help?",
    name: "André",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "provide an address",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      res.send({ error: error });
    } else {
      weather(data, (error, data) => {
        if (error) {
          res.send({ error: error });
        } else {
          res.send({
            address: req.query.address,
            ...data,
          });
        }
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 article",
    message: "Article help not found",
    name: "André",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "André",
  });
});

app.listen(3000, () => {
  console.log("server up");
});
