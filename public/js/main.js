const API_URL = 'http://localhost:3000/api'; // Certifique-se que a porta corresponde ao seu server.js!

// ----------------------------------------------------------------------
// FUNÇÕES DE UTILIDADE
// ----------------------------------------------------------------------

/**
 * Exibe uma mensagem de feedback na interface do usuário.
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} type - O tipo de mensagem ('success' ou 'error').
 */
function displayMessage(message, type = 'success') {
    const messageArea = document.getElementById('message-area');
    messageArea.textContent = message;
    messageArea.className = `alert ${type}`;
    messageArea.classList.remove('hidden');
    
    // Ocultar a mensagem após 4 segundos
    setTimeout(() => {
        messageArea.classList.add('hidden');
    }, 4000);
}

/**
 * Retorna o token JWT armazenado.
 * @returns {string | null}
 */
function getToken() {
    return localStorage.getItem('authToken');
}

// ----------------------------------------------------------------------
// LÓGICA DE AUTENTICAÇÃO (index.html)
// ----------------------------------------------------------------------

if (document.getElementById('login-form')) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');

    // Alternar entre Login e Cadastro
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });

    // ----------------- CADASTRO -----------------
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch(`${API_URL}/usuarios/cadastro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: name, email, senha: password })
            });

            const data = await response.json();

            if (response.ok) {
                displayMessage('Cadastro realizado com sucesso! Faça login.', 'success');
                // Alterna para o formulário de login após o cadastro
                registerSection.classList.add('hidden');
                loginSection.classList.remove('hidden');
                loginForm.reset();
            } else {
                displayMessage(data.message || 'Erro ao cadastrar.', 'error');
            }
        } catch (error) {
            displayMessage('Erro de conexão com o servidor.', 'error');
        }
    });

    // ----------------- LOGIN -----------------
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha: password })
            });

            const data = await response.json();

            if (response.ok) {
                // Armazena o token e redireciona para a página de tarefas
                localStorage.setItem('authToken', data.token);
                window.location.href = 'tarefas.html';
            } else {
                displayMessage(data.message || 'E-mail ou senha inválidos.', 'error');
            }
        } catch (error) {
            displayMessage('Erro de conexão com o servidor.', 'error');
        }
    });
}


// ----------------------------------------------------------------------
// LÓGICA DE TAREFAS (tarefas.html)
// ----------------------------------------------------------------------

if (document.getElementById('tasks-container')) {
    const token = getToken();
    
    // Verifica se o usuário está logado
    if (!token) {
        alert('Você precisa fazer login para acessar esta página.');
        window.location.href = 'index.html';
    }

    // Função de Logout
    document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    });
    
    // ----------------- FUNÇÕES CRUD (Ainda a ser implementadas) -----------------
    
    /** * Responsável por carregar e renderizar as tarefas na tela.
     * Requer o método GET na rota /api/tarefas.
     */
    async function fetchTasks() {
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = '<p id="loading-tasks">Carregando tarefas...</p>';

        try {
            const response = await fetch(`${API_URL}/tarefas`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Envio do JWT!
                }
            });

            const tasks = await response.json();
            
            if (response.ok) {
                renderTasks(tasks);
            } else {
                 displayMessage(tasks.message || 'Erro ao carregar tarefas.', 'error');
                 tasksContainer.innerHTML = '<p>Erro ao carregar tarefas. Tente novamente após o login.</p>';
            }

        } catch (error) {
            displayMessage('Erro de conexão ao carregar tarefas.', 'error');
            tasksContainer.innerHTML = '<p>Falha na conexão com o servidor.</p>';
        }
    }

    /** * Renderiza as tarefas no DOM.
     * @param {Array} tasks - Lista de objetos de tarefa.
     */
    function renderTasks(tasks) {
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = ''; // Limpa a lista

        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<p>Nenhuma tarefa encontrada. Que tal criar uma?</p>';
            return;
        }

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            
            // Define a classe de status para estilização
            const statusClass = `status-${task.status.substring(0, 1)}`; // Ex: 'A fazer' -> 'status-A'

            taskElement.innerHTML = `
                <div class="task-details">
                    <h3>${task.titulo}</h3>
                    <p>${task.descricao || 'Sem descrição.'}</p>
                    <span class="task-status ${statusClass}">${task.status}</span>
                </div>
                <div class="task-actions">
                    <button class="edit-btn" data-id="${task.id}">Editar</button>
                    <button class="delete-btn" data-id="${task.id}">Excluir</button>
                </div>
            `;
            tasksContainer.appendChild(taskElement);
        });

        // Adiciona event listeners para os botões de ação (Editar e Excluir)
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => deleteTask(e.target.dataset.id));
        });
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => editTask(e.target.dataset.id));
        });
    }

    // Inicializa o carregamento das tarefas ao entrar na página
    fetchTasks();

    // *** FALTAM AS FUNÇÕES deleteTask, updateTask e o listener do task-form ***
    // (Dependem das rotas POST, PUT/PATCH e DELETE do Backend)
}