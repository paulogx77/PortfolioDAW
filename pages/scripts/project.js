document.addEventListener('DOMContentLoaded', function() {
    // 1. IDENTIFICAR O PROJETO ATUAL
    // Pega o ID único do projeto do atributo 'data-project-id' no body
    const projectId = document.body.dataset.projectId;
    if (!projectId) {
        console.error('ID do projeto não encontrado!');
        return; // Para o script se não houver ID
    }

    // A chave no localStorage será única para cada projeto, ex: "comments_ana-projeto-calculadora"
    const storageKey = `comments_${projectId}`;

    // 2. SELECIONAR ELEMENTOS DO DOM
    const listaComentarios = document.getElementById('lista-comentarios');
    const inputComentario = document.getElementById('input-comentario');
    const botaoAdicionar = document.getElementById('btn-adicionar');

    // 3. FUNÇÃO PARA CARREGAR COMENTÁRIOS DO LOCALSTORAGE
    function carregarComentarios() {
        // Pega os comentários salvos (em formato de texto JSON) ou um array vazio se não houver nada
        const comentariosSalvos = JSON.parse(localStorage.getItem(storageKey)) || [];
        // Limpa a lista atual para não duplicar
        listaComentarios.innerHTML = ''; 
        // Adiciona cada comentário salvo na tela
        comentariosSalvos.forEach(texto => adicionarComentarioNaTela(texto));
    }

    // 4. FUNÇÃO PARA ADICIONAR UM COMENTÁRIO NA TELA
    function adicionarComentarioNaTela(texto) {
        const novoComentario = document.createElement('div');
        novoComentario.className = 'comentario';
        novoComentario.textContent = texto;
        listaComentarios.appendChild(novoComentario);
    }

    // 5. FUNÇÃO PARA SALVAR UM NOVO COMENTÁRIO
    function salvarNovoComentario() {
        const texto = inputComentario.value.trim();
        if (texto === '') return; // Não faz nada se o input estiver vazio

        // Carrega os comentários existentes
        const comentariosAtuais = JSON.parse(localStorage.getItem(storageKey)) || [];
        // Adiciona o novo comentário ao array
        comentariosAtuais.push(texto);
        // Salva o array atualizado de volta no localStorage
        localStorage.setItem(storageKey, JSON.stringify(comentariosAtuais));

        // Adiciona o novo comentário na tela e limpa o input
        adicionarComentarioNaTela(texto);
        inputComentario.value = '';
        inputComentario.focus();
    }

    // 6. ADICIONAR OS EVENTOS
    botaoAdicionar.addEventListener('click', salvarNovoComentario);
    inputComentario.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            salvarNovoComentario();
        }
    });

    // 7. INICIALIZAÇÃO
    // Carrega os comentários assim que a página é aberta
    carregarComentarios();
});