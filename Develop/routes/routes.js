const routes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const readDbJson = () => JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
// Function to write to db.json
const writeDbJson = (data) => {
  const jsonData = JSON.stringify(data);
  fs.writeFileSync("db/db.json", jsonData);
};

// API routes
// Get all notes
routes.get('/api/notes', (req, res) => {
  const dbJson = readDbJson();
  res.json(dbJson);
});
// Post new note
routes.post('/api/notes', (req, res) => {
  const dbJson = readDbJson();
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  dbJson.push(newNote);
  writeDbJson(dbJson);
  res.json(dbJson);
});
// Delete note by id
routes.delete('/api/notes/:id', (req, res) => {
    const dbJson = readDbJson();
    const updatedDbJson = dbJson.filter((note) => note.id !== req.params.id);
    writeDbJson(updatedDbJson);
    res.json(updatedDbJson);
    });

// HTML routes
routes.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

routes.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = routes;