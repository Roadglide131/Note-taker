const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.get("/api/notes", (req, res) => {
  const db = fs.readFileSync("./db/db.json");
  return res.json(JSON.parse(db));
});
app.post("/api/notes", (req, res) => {
  const notes = getNotesFromDatabase();
  const newNote = req.body;
  console.log(notes[notes.length - 1]);
  newNote.id = notes.length;
  notes.push(newNote);
  const data = JSON.stringify(notes);
  fs.writeFileSync("./db/db.json", data);
  return res.json(getNotesFromDatabase());
});
app.delete("/api/notes/:id", (req, res) => {
  const notes = getNotesFromDatabase();
  let newNotesList = notes.filter((note) => note.id != req.params.id);
  console.log(req.params.id, newNotesList);
  const data = JSON.stringify(newNotesList);
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
