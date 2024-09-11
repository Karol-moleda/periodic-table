const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

const jsonFilePath = './data/elements.json';

app.use(cors());
app.use(bodyParser.json());

app.get('/elements', (req, res) => {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'File reading error' });
    }
    res.json(JSON.parse(data));
  });
});

app.put('/elements/:id', (req, res) => {
  const updatedElement = req.body;
  const id = parseInt(req.params.id, 10);

  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'File reading error' });
    }

    let elements = JSON.parse(data);
    const index = elements.findIndex((el) => el.position === id);

    if (index !== -1) {
      const updatedElements = elements.map((el) =>
        el.position === id ? { ...el, ...updatedElement } : el,
      );

      fs.writeFile(jsonFilePath, JSON.stringify(updatedElements, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error writing to file' });
        }
        res.json(updatedElement);
      });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`The server runs on the port ${PORT}`);
});
