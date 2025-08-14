// Espera o documento HTML inteiro ser carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DAS ABAS (TABS) ---

    // 1. Seleciona todos os botões que controlam as abas
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // 2. Seleciona todos os painéis de conteúdo das abas
    const tabPanes = document.querySelectorAll('.tab-pane');

    // 3. Adiciona um "ouvinte" de evento de clique para CADA botão
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // Pega o valor do atributo 'data-tab' do botão que foi clicado.
            // Ex: se clicou em "Comentários", o valor será "comentarios".
            const targetTab = button.getAttribute('data-tab');

            // --- Remove a classe 'active' de todos ---
            // Remove o destaque de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Esconde todos os painéis de conteúdo
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // --- Adiciona a classe 'active' apenas nos alvos ---
            // Adiciona o destaque visual apenas no botão que foi clicado
            button.classList.add('active');

            // Encontra o painel de conteúdo que tem o ID igual ao 'data-tab' do botão
            // e o torna visível, adicionando a classe 'active'.
            document.getElementById(targetTab).classList.add('active');
        });
    });

});