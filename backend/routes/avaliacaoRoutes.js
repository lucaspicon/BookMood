const express = require('express')
const router = express.Router()
const controller = require('../controllers/avaliacaoController')

router.post('/', controller.criarAvaliacao)
router.get('/', controller.listarAvaliacoes)

module.exports = router