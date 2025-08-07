document.addEventListener('DOMContentLoaded', function() {

    // 1. SELECIONAR OS ELEMENTOS DO HTML
    // Pegamos o botão, o campo de input e a lista onde os comentários serão exibidos.
    const botaoAdicionar = document.getElementById('btn-adicionar-comentario');
    const inputComentario = document.getElementById('input-comentario');
    const listaComentarios = document.getElementById('lista-comentarios-projeto-x');

    // 2. ADICIONAR UM "ESCUTADOR DE EVENTOS" AO BOTÃO
    // Isso faz com que, toda vez que o botão for clicado, a função que está dentro dele seja executada.
    botaoAdicionar.addEventListener('click', function() {
        
        // 3. CAPTURAR O VALOR DO INPUT
        // Pegamos o texto que o usuário digitou e removemos espaços em branco do início e do fim.
        const textoComentario = inputComentario.value.trim();

        // 4. VERIFICAR SE O COMENTÁRIO NÃO ESTÁ VAZIO
        // Se o usuário não digitou nada, não fazemos nada.
        if (textoComentario !== '') {
            
            // 5. CRIAR UM NOVO ELEMENTO HTML PARA O COMENTÁRIO
            const novoComentario = document.createElement('div'); // Cria uma <div>
            novoComentario.classList.add('comentario');           // Adiciona a classe 'comentario' para estilização
            novoComentario.textContent = textoComentario;         // Define o texto do elemento como o texto digitado

            // 6. ADICIONAR O NOVO COMENTÁRIO À LISTA
            // Colocamos a <div> que acabamos de criar dentro da 'lista-comentarios'.
            listaComentarios.appendChild(novoComentario);

            // 7. LIMPAR O CAMPO DE INPUT
            // Deixamos o campo pronto para um novo comentário.
            inputComentario.value = '';

            // Opcional: Focar no input novamente para facilitar a digitação de múltiplos comentários
            inputComentario.focus();
        }
    });

    // Bônus: Permitir adicionar comentário ao pressionar "Enter" no campo de input
    inputComentario.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            // "Clica" no botão programaticamente, o que dispara o evento de clique que já criamos
            botaoAdicionar.click();
        }
    });

});