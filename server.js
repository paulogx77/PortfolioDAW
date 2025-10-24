// 1. Importar as bibliotecas necessárias
const express = require('express');
const path = require('path');

// 2. Inicializar o aplicativo Express
const app = express();
const PORT = 3000; // A porta onde o servidor vai rodar

app.use(express.urlencoded({ extended: true }));

// 3. Configurar o EJS como o motor de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 4. Configurar o servidor para usar a pasta 'public' para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

const perfis = [
    {
        id: 'ana-silva',
        nome: 'Ana Silva',
        cargo: 'Desenvolvedora Front-End',
        imagem: '/imagens/ana.jpg',
        // NOVO: Adicionamos uma lista de projetos para a Ana
        projetos: [
            {
                id: 'ecommerce-react',
                titulo: 'Website de E-commerce',
                descricao: 'Plataforma de vendas online completa com foco em UX.',
                tecnologias: ['React', 'Node.js', 'UI/UX']
            },
            {
                id: 'app-clima',
                titulo: 'App de Previsão do Tempo',
                descricao: 'Aplicação que consome uma API externa para mostrar o clima.',
                tecnologias: ['JavaScript Puro', 'HTML5', 'CSS Grid']
            }
        ]
    },
    {
        id: 'joao-costa',
        nome: 'João Costa',
        cargo: 'Desenvolvedor Back-End',
        imagem: '/imagens/joao.jpg',
        // NOVO: Adicionamos a lista de projetos para o João
        projetos: [
            {
                id: 'api-restful',
                titulo: 'API RESTful para Blog',
                descricao: 'Servidor robusto para gerenciar posts, usuários e comentários.',
                tecnologias: ['Node.js', 'Express', 'MongoDB']
            }
        ]
    }
];


// 5. Definir a rota principal (Homepage)
app.get('/', (req, res) => {
    // 'res.render' procura um arquivo na pasta 'views' e o envia para o navegador
    res.render('index', { perfis: perfis }); 
});

// --- ROTA PARA O PERFIL INDIVIDUAL ---
// O ":id" é um "parâmetro de rota". Ele age como uma variável na URL.
app.get('/perfil/:id', (req, res) => {
    // 1. Pegar o ID da URL que o usuário acessou
    const perfilId = req.params.id;

    // 2. Encontrar o perfil correspondente no nosso array de dados
    // O método .find() é perfeito para isso!
    const perfilEncontrado = perfis.find(p => p.id === perfilId);

    // 3. Verificar se o perfil foi encontrado
    if (perfilEncontrado) {
        // Se encontramos, renderizamos uma nova página 'perfil.ejs'
        // e passamos apenas os dados daquele perfil específico para ela.
        res.render('perfil', { perfil: perfilEncontrado });
    } else {
        // Se não encontramos um perfil com aquele ID, enviamos um erro 404 (Não Encontrado)
        res.status(404).send('Perfil não encontrado!');
    }
});

app.get('/perfil/:id/projeto/:idProjeto', (req, res) => {
    // 1. Pegamos os IDs da URL
    const perfilId = req.params.id;
    const projetoId = req.params.idProjeto;

    // 2. Primeiro, encontramos o perfil correspondente
    const perfilEncontrado = perfis.find(p => p.id === perfilId);

    // Se não acharmos o perfil, já paramos por aqui.
    if (!perfilEncontrado) {
        return res.status(404).send('Perfil não encontrado!');
    }

    // 3. Agora, dentro do perfil encontrado, encontramos o projeto específico
    const projetoEncontrado = perfilEncontrado.projetos.find(proj => proj.id === projetoId);

    // 4. Verificamos se o projeto foi encontrado
    if (projetoEncontrado) {
        // Se encontramos, renderizamos a página 'projeto.ejs'.
        // Passamos tanto os dados do projeto quanto os do perfil, pois podem ser úteis!
        res.render('projeto', { 
            perfil: perfilEncontrado, 
            projeto: projetoEncontrado 
        });
    } else {
        // Se não encontramos o projeto dentro daquele perfil
        res.status(404).send('Projeto não encontrado!');
    }
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro'); // Vamos criar este arquivo .ejs agora
});

app.post('/cadastro', (req, res) => {
    // 1. Os dados do formulário chegam em "req.body" graças ao middleware
    console.log('Dados recebidos:', req.body); // Ótimo para depurar!

    // 2. Criamos um novo objeto de perfil com os dados recebidos
    const novoPerfil = {
        // Criamos um ID único simples (nome em minúsculas + timestamp)
        id: req.body.nome.toLowerCase().replace(' ', '-') + '-' + Date.now(),
        nome: req.body.nome,
        cargo: req.body.cargo,
        imagem: req.body.imagem || '/imagens/default.jpg', // Usa uma imagem padrão se nenhuma for enviada
        projetos: [] // Começa com uma lista de projetos vazia
    };

    // 3. Adicionamos o novo perfil ao nosso "banco de dados" (o array)
    perfis.push(novoPerfil);

    // 4. Redirecionamos o usuário de volta para a página inicial
    res.redirect('/');
});


// 6. Iniciar o servidor e fazê-lo "ouvir" por pedidos na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});