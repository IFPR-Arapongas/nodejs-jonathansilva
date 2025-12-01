const { Pool } = require('pg');

// 1. Configuração da Conexão
// O Pool lê automaticamente as variáveis de ambiente (DB_USER, DB_HOST, etc.)
// do arquivo .env que você irá criar (usando o dotenv no server.js)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// 2. Função de Consulta
/**
 * Executa uma consulta SQL no banco de dados.
 * @param {string} text - O comando SQL a ser executado (ex: 'SELECT * FROM usuarios WHERE id = $1').
 * @param {Array} params - Os parâmetros para evitar SQL Injection (ex: [123]).
 * @returns {Promise<Object>} O resultado da consulta (rows, rowCount, etc.).
 */
const query = (text, params) => {
    // Exibe a query no console (útil para debug)
    console.log('QUERY EXECUTADA:', text, params || '');
    return pool.query(text, params);
};

// 3. Exporta a função para ser usada em rotas/controllers
module.exports = {
    query,
};

// Testa a conexão (opcional, mas recomendado)
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao adquirir cliente do pool de conexão', err.stack);
    }
    console.log('✅ Conexão com o banco de dados SQL estabelecida com sucesso!');
    release(); // Libera o cliente de volta para o pool
});