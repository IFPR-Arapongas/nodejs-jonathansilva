const express = require('express');
const router = express.Router();

// 1. PUT /api/tarefas/:id (Substituição completa)
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const dadosAtualizados = req.body;
  console.log(`ROTA 3: PUT - Atualizar completamente a tarefa com ID: ${id}`);
  // Lógica para atualização completa no DB
  res.status(200).json({ mensagem: `Tarefa ${id} atualizada completamente.`, dados: dadosAtualizados, metodo: 'PUT', arquivo: 'rota3.routes.js' });
});

// 2. PATCH /api/tarefas/:id (Atualização parcial)
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const dadosParciais = req.body;
  console.log(`ROTA 3: PATCH - Atualizar parcialmente a tarefa com ID: ${id}`);
  // Lógica para atualização parcial no DB
  res.status(200).json({ mensagem: `Tarefa ${id} atualizada parcialmente.`, dados: dadosParciais, metodo: 'PATCH', arquivo: 'rota3.routes.js' });
});

module.exports = router;