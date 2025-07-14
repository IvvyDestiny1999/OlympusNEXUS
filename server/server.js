const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Banco de dados SQLite
const db = new sqlite3.Database('./produtos.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT NOT NULL,
      metros INTEGER NOT NULL
    )`);
  }
});

// Rota para listar produtos
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Rota para adicionar produto
app.post('/produtos', (req, res) => {
  const { codigo, metros } = req.body;
  if (!codigo || typeof codigo !== 'string' || codigo.length !== 5 || !metros || typeof metros !== 'number' || metros <= 0) {
    return res.status(400).json({ error: 'Dados inválidos. Código deve ser uma string de 5 caracteres e metros deve ser um número positivo.' });
  }
  db.run('INSERT INTO produtos (codigo, metros) VALUES (?, ?)', [codigo, metros], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, codigo, metros });
    }
  });
});

// Rota para deletar produto
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Produto não encontrado.' });
    } else {
      res.json({ message: 'Produto deletado com sucesso.' });
    }
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
