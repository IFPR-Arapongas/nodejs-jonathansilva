// 1. Importações de Módulos Essenciais
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 

// 2. Configuração de Variáveis de Ambiente
dotenv.config();

// 3. Inicialização do Express
const app = express();
const PORT = process.env.PORT || 3000;

// ===========================================
// 4. Importação dos Módulos de Rotas
// ===========================================

// Rotas de TAREFAS (CRUD)
const rota1Get = require('./routes/rota1.routes');   
const rota2Post = require('./routes/rota2.routes');  
const rota3Update = require('./routes/rota3.routes'); 
const rota4Delete = require('./routes/rota4.routes'); 

// Rotas de USUÁRIO (Auth - Cadastro/Login)
// Assumimos que vamos criar um arquivo user.routes.js para Login e Cadastro.
const userRoutes = require('./routes/user.routes'); 


// ===========================================
// 5. Configuração de Middlewares
// ===========================================

// a) CORS: Permite requisições de origens diferentes (necessário para o Frontend)
app.use(cors());

// b) Body Parser para JSON: Permite que o Express leia o corpo das requisições POST/PUT
app.use(express.json());


// ===========================================
// 6. Definição e Montagem das Rotas da Aplicação
// ===========================================

// Montagem das Rotas de TAREFAS (CRUD) no prefixo /api/tarefas
app.use('/api/tarefas', rota1Get);
app.use('/api/tarefas', rota2Post);
app.use('/api/tarefas', rota3Update);
app.use('/api/tarefas', rota4Delete);

// Montagem das Rotas de USUÁRIOS (Login e Cadastro) no prefixo /api/usuarios
app.use('/api/usuarios', userRoutes); 


// 7. Rota de Teste Simples (Opcional, mas útil)
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'API Gerenciador de Tarefas rodando.',
        status: 'OK'
    });
});

// 8. Tratamento de Erro de Rota Não Encontrada (404)
app.use((req, res, next) => {
    res.status(404).json({ 
        message: 'Rota não encontrada. Verifique o endpoint.' 
    });
});


// 9. Início do Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});