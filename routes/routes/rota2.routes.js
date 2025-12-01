const express = require('express');
const router = express.Router();

// 1. POST /api/tarefas (Criar novo recurso)
router.post('/', (req, res) => {
  const novaTarefa = req.body;
  console.log('ROTA 2: POST - Criar nova tarefa', novaTarefa);
  // Lógica para salvar a nova tarefa no DB (ex: INSERT INTO tarefas)
  
  res.status(201).json({ mensagem: 'Tarefa criada com sucesso!', dados: novaTarefa, metodo: 'POST', arquivo: 'rota2.routes.js' });
});

module.exports = router;