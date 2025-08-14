// 1. Importar as bibliotecas necessárias
const express = require('express');

// 2. Inicializar o aplicativo Express
const app = express();
const PORT = 3000; // A porta onde o servidor vai rodar

// 3. Configurar o EJS como o motor de templates
app.set('view engine', 'ejs');

// 4. Configurar o servidor para usar a pasta 'public' para arquivos estáticos
app.use(express.static('public'));

// 5. Definir a rota principal (Homepage)
app.get('/', (req, res) => {
    // 'res.render' procura um arquivo na pasta 'views' e o envia para o navegador
    res.render('index'); 
});

// 6. Iniciar o servidor e fazê-lo "ouvir" por pedidos na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});