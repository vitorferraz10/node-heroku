const express = require("express");
const { members } = require("./api/data.json");
const cors = require("cors");
const { v4 } = require("uuid");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json(members);
});

app.post("/created", (req, res) => {
  const { id, name, phone } = req.body;

  const newMember = members.find((userName) => userName.name === name);

  if (!newMember) {
    members.push({ name, id: v4(), phone });
    return res.json(members);
  } else {
    return res.json("Member alredy exists! ");
  }
});

app.put("/update/:index", (req, res) => {
  const { index } = req.params;
  const { name, phone } = req.body;
  console.log(index);
  members[0].name = name;

  members[0].phone = phone;

  return res.json(members);
});

app.delete("/delete/:index", (req, res) => {
  const { index } = req.params;

  members.splice(index, 1);

  return res.status(204).json(members);
});

app.listen(process.env.PORT || 3001);
