// BACKEND BOOKMOOD
const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = 3001

// CONECTA BD
const db = new sqlite3.Database('bookmood.db')

// CRIACAO DE TABELA AUTOMATICA
db.run(`
  CREATE TABLE IF NOT EXISTS avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    livro TEXT NOT NULL,
    nota INTEGER NOT NULL,
    comentario TEXT NOT NULL,
    data TEXT NOT NULL
  )
`);

// MIDDLEWARES
app.use(cors());
app.use(express.json())

// ROTA PARA CADASTRAR AVALIACAO
app.post('/avaliacoes', (req, res) => {
  const { livro, nota, comentario } = req.body

  // VALIDACAO SIMPLES
  if (!livro || typeof livro !== 'string' || livro.trim() === "") {
    return res.status(400).json({ erro: "O campo 'livro' é obrigatório." })
  }

  const notaNum = Number(nota);
  if (isNaN(notaNum) || notaNum < 1 || notaNum > 5) {
    return res.status(400).json({ erro: "A nota deve ser um número de 1 a 5." })
  }

  if (!comentario || comentario.trim().length < 3) {
    return res.status(400).json({ erro: "Comentário muito curto." })
  }

  const dataAtual = new Date().toISOString()

  db.run(
    `INSERT INTO avaliacoes (livro, nota, comentario, data) VALUES (?, ?, ?, ?)`,
    [livro.trim(), notaNum, comentario.trim(), dataAtual],
    function (err) {
      if (err) {
        console.error("Erro ao salvar no banco:", err)
        return res.status(500).json({ erro: "Erro interno ao salvar avaliação." })
      }
      res.status(201).json({ mensagem: "Avaliação registrada com sucesso!" })
    }
  )
})

// LISTA DE AVALIACOES
app.get('/avaliacoes', (req, res) => {
  db.all(`SELECT * FROM avaliacoes ORDER BY data DESC`, [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar avaliações:", err)
      return res.status(500).json({ erro: "Erro ao buscar avaliações." })
    }
    res.status(200).json(rows)
  })
})

// LIGAR SERVIDOR
app.listen(PORT, () => {
  console.log(`🟢 Backend BookMood rodando em http://localhost:${PORT} com SQLite`)
})
