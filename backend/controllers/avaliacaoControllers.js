const sqlite3 = require('sqlite3').verbose()
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
`)

exports.listarAvaliacoes = (req, res) => {
  db.all(`SELECT * FROM avaliacoes ORDER BY data DESC`, [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar avaliações:", err)
      return res.status(500).json({ erro: "Erro ao buscar avaliações." })
    }
    res.status(200).json(rows);
  })
}

exports.criarAvaliacao = (req, res) => {
  const { livro, nota, comentario } = req.body

  // VALIDACAO SIMPLES
  if (!livro || typeof livro !== 'string' || livro.trim() === "") {
    return res.status(400).json({ erro: "O campo 'livro' é obrigatório." })
  }

  const notaNum = Number(nota)
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
        console.error("Erro ao salvar avaliação:", err)
        return res.status(500).json({ erro: "Erro ao salvar avaliação." })
      }
      res.status(201).json({ mensagem: "Avaliação registrada com sucesso!" })
    }
  )
}
