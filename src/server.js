import express from "express";
import { people } from "./people.js";
import * as fs from "fs/promises";
import bodyParser from "body-parser";
let app = express();
app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  res.send("Hello world!");
});

app.get("/people", (req, res) => {
  res.json(people);
});

app.get("/people/:name", (req, res) => {
  let { name } = req.params;
  console.log(name);
  let person = people.find(
    (x) => x.name.toLocaleLowerCase() === name.toLocaleLowerCase()
  );
  console.log(person);
  res.json(person);
});

app.get("/file-data", async (req, res) => {
  let data = await fs.readFile("./people-data.json");
  let dataJson = JSON.parse(data);
  res.json(dataJson);
});

app.post("/people", (req, res) => {
  let newPerson = req.body;
  console.log(req.body);
  people.push(newPerson);
  res.json(people);
});

app.listen(3000, () => {
  console.log("Hello!!!");
});
