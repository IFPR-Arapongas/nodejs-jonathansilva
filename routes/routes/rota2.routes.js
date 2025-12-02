const express = require('express');
const router = express.Router();
const db = require('../db');        // Nosso módulo de conexão com o banco
const bcrypt = require('bcryptjs');  // Para criptografar senhas

// ----------------------------------------------------------------------
// 1. POST /api/tarefas (Criação de Tarefa)
// Manteremos esta rota por enquanto (o nome do arquivo é ROTA2 POST)
// Mas vamos adicionar a rota de Cadastro de Usuário (que também é POST).
// ----------------------------------------------------------------------
router.post('/', (req, res) => {
  const novaTarefa = req.body;
  console.log('ROTA 2: POST - Criar nova tarefa (Placeholder)', novaTarefa);
  
  // A lógica completa de criação de tarefas será feita após o login JWT.
  res.status(201).json({ mensagem: 'Tarefa criada (Aguardando implementação completa de JWT).', dados: novaTarefa, metodo: 'POST', arquivo: 'rota2.routes.js' });
});


// ----------------------------------------------------------------------
// 2. POST /api/usuarios/cadastro (CADASTRO DE USUÁRIO)
// Vamos adicionar uma rota específica para cadastro.
// NOTA: No server.js, você precisará apontar esta rota para o prefixo /api/usuarios.
// ----------------------------------------------------------------------
router.post('/cadastro', async (req, res) => {
    // 1. Extrai dados da requisição
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // 2. Verifica se o e-mail já existe (UNICO)
        const checkUser = await db.query('SELECT id FROM usuarios WHERE email = $1', [email]);
        if (checkUser.rows.length > 0) {
            return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
        }

        // 3. Criptografa a Senha
        // Gera o salt (custo de criptografia) e então o hash
        const salt = await bcrypt.genSalt(10);
        const senha_hash = await bcrypt.hash(senha, salt);

        // 4. Insere o novo usuário no MySQL
        // Usamos $1, $2, $3 como placeholders. O db.js se encarrega de injetar os valores de forma segura.
        // NOTA: Em PostgreSQL usamos RETURNING. Em MySQL, geralmente dependemos do driver para obter o ID.
        const result = await db.query(
            'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3)',
            [nome, email, senha_hash]
        );
        
        // Em MySQL/MariaDB, se o driver 'pg' for substituído por 'mysql2', o retorno seria diferente.
        // Assumindo que o db.js lida com a inserção e retorna sucesso.

        // 5. Retorna sucesso
        res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso! Prossiga para o login.'
        });

    } catch (error) {
        console.error('Erro no cadastro de usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao cadastrar usuário.' });
    }
});

module.exports = router;