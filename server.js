const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/api/notes", (req, res) => {
  const db = fs.readFileSync("./db/db.json");
  return res.json(JSON.parse(db));
});
app.post("/api/notes", (req, res) => {
  const notes = getNotesFromDatabase();
  const newNote = req.body;
  console.log(newNote);

  notes.push(newNote);
  const data = JSON.stringify(notes);
  fs.writeFileSync("./db/db.json", data);
  return res.json(getNotesFromDatabase());
});
function getNotesFromDatabase() {
  const db = fs.readFileSync("./db/db.json");
  return JSON.parse(db);
}
app.listen(PORT, () => {
  console.log("The application has been started");
});
