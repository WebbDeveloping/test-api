require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mock database
let items = [
  {
    name: "harry",
  },
];

// Create
app.post("/items", (req, res) => {
  console.log("post request hit", req.body);
  const item = req.body;
  items.push(item);
  res.status(201).send(`Item added with name: ${item.name}`);
});

// Read
app.get("/items", (req, res) => {
  console.log("read request hit");
  res.status(200).json(items);
});

// Update
app.put("/items/:name", (req, res) => {
  const name = req.params.name;
  console.log("update request hit", req);
  const item = req.body;
  const index = items.findIndex((i) => i.name === name);
  if (index !== -1) {
    items[index] = item;
    res.send(`Item with name ${name} updated.`);
  } else {
    res.status(404).send("Item not found");
  }
});

// Delete
app.delete("/items/:name", (req, res) => {
  console.log("delete request hit");
  const name = req.params.name;
  items = items.filter((i) => i.name !== name);
  res.send(`Item with name ${name} deleted.`);
});

app.listen(PORT, () => {
  console.log(`MYCONSOLE Server is running on port ${PORT}`);
});
