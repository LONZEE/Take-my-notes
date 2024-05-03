const routes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const readDbJson = () => JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

// Function to write to db.json file
const writeDbJson = (data) => {
  const jsonData = JSON.stringify(data);
  fs.writeFileSync("db/db.json", jsonData);
};

// API routes
routes.get('/api/notes', (req, res) => {
  const dbJson = readDbJson();
  res.json(dbJson);
});

routes.post('/api/notes', (req, res) => {
  const dbJson = readDbJson();
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid(),
  };
  dbJson.push(newNote);
  writeDbJson(dbJson);
  res.json(dbJson);
});

// HTML routes
routes.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

routes.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = routes;