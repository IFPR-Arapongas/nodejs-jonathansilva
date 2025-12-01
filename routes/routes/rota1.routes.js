const express = require('express');
const router = express.Router();

// 1. GET /api/tarefas (Listar todas)
router.get('/', (req, res) => {
  console.log('ROTA 1: GET - Listar todas as tarefas');
  // Lógica de busca de dados no DB (ex: SELECT * FROM tarefas WHERE usuario_id = req.userId)
  res.status(200).json({ mensagem: 'Lista de tarefas retornada.', metodo: 'GET', arquivo: 'rota1.routes.js' });
});

// 2. GET /api/tarefas/:id (Buscar por ID)
router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(`ROTA 1: GET - Buscar tarefa com ID: ${id}`);
  // Lógica de busca de uma única tarefa
  res.status(200).json({ mensagem: `Detalhes da tarefa ${id} retornados.`, metodo: 'GET', arquivo: 'rota1.routes.js' });
});

module.exports = router;