const express = require('express');
const router = express.Router();

// 1. DELETE /api/tarefas/:id (Remover recurso)
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log(`ROTA 4: DELETE - Deletar tarefa com ID: ${id}`);
  // Lógica para remover a tarefa do DB (ex: DELETE FROM tarefas)
  
  // Status 204 No Content
  res.status(204).send();
});

module.exports = router;