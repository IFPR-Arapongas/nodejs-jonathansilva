const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// ===================================
// Importação e Montagem das Rotas (CRUD Completo)
// ===================================

// Renomeando os imports conforme solicitado:
const rota1Get = require('./routes/rota1.routes');   // GET (Leitura)
const rota2Post = require('./routes/rota2.routes');  // POST (Criação)
const rota3Update = require('./routes/rota3.routes'); // PUT/PATCH (Atualização)
const rota4Delete = require('./routes/rota4.routes'); // DELETE (Remoção)

// Monta todas as rotas no prefixo '/api/tarefas'
app.use('/api/tarefas', rota1Get);
app.use('/api/tarefas', rota2Post);
app.use('/api/tarefas', rota3Update);
app.use('/api/tarefas', rota4Delete);

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});