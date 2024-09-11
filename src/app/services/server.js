const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Ścieżka do pliku JSON
const jsonFilePath = './data/elements.json';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint do pobierania danych
app.get('/elements', (req, res) => {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Błąd odczytu pliku' });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint do aktualizacji danych
app.put('/elements/:id', (req, res) => {
  const updatedElement = req.body;
  const id = parseInt(req.params.id, 10);

  // Odczytanie istniejącego pliku JSON
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Błąd odczytu pliku' });
    }

    let elements = JSON.parse(data);

    // Sprawdź, czy element istnieje
    const index = elements.findIndex(el => el.position === id);

    if (index !== -1) {
      // Stwórz nową kopię listy elementów z wprowadzonymi zmianami
      const updatedElements = elements.map(el =>
        el.position === id ? { ...el, ...updatedElement } : el
      );

      // Zapisz nowy stan danych
      fs.writeFile(jsonFilePath, JSON.stringify(updatedElements, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Błąd zapisu do pliku' });
        }
        res.json(updatedElement);
      });
    } else {
      res.status(404).json({ error: 'Element nie znaleziony' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
