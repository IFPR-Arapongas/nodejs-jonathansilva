// 1. Importações de Módulos Essenciais
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Para permitir que o Frontend (domínio diferente) acesse a API

// 2. Configuração de Variáveis de Ambiente
// Carrega as variáveis do arquivo .env para process.env
dotenv.config();

// 3. Inicialização do Express
const app = express();
const PORT = process.env.PORT || 3000;

// 4. Importação das Rotas
// Iremos definir essas rotas mais tarde na pasta 'routes/'
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');

// 5. Configuração de Middlewares
// a) CORS (Importante para o desenvolvimento)
// O cors permite que seu frontend (rodando em outra porta, ex: 5500) acesse sua API (ex: 3000)
app.use(cors());

// b) Body Parser para JSON
// Habilita o Express a ler o corpo das requisições POST/PUT no formato JSON
app.use(express.json());

// c) Rota de Teste Simples (Opcional, mas útil)
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'API Gerenciador de Tarefas rodando com sucesso!',
        version: '1.0.0'
    });
});

// 6. Definição das Rotas da Aplicação
// Associa os módulos de rotas aos caminhos base da URL
app.use('/api/usuarios', userRoutes); // Ex: POST /api/usuarios/login
app.use('/api/tarefas', taskRoutes);   // Ex: GET /api/tarefas

// 7. Tratamento de Erro de Rota Não Encontrada (404)
app.use((req, res, next) => {
    res.status(404).json({ 
        message: 'Rota não encontrada. Verifique o endpoint.' 
    });
});

// 8. Início do Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});