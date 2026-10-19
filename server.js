//1.A criando o projeto e configurando a porta 3000

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

//1.B inicializando criando o array dos alunos

let alunos = [
    {id: 1, nome: 'Ana', curso: 'computação'},
    {id: 2, nome: 'Pedro', curso: 'sistemas de informação'},
];

//criando uma variável para o id novo

let novoId = 3;

//implementando as rotas

//GET /alunos: retorna a lista completa de alunos cadastrados.

app.get('/alunos', (req, res) => {
    res.status(200).json(alunos);
});

//GET /alunos/:id: retorna os dados de um aluno específico, identificado pelo ID informado na URL.

app.get('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const aluno = alunos.find(aluno => aluno.id === id);
    if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.status(200).json(aluno);
});

//POST /alunos: cadastra um novo aluno, recebendo os atributos nome e curso no corpo da requisição em formato JSON.

app.post('/alunos', (req, res) => {
    const { nome, curso } = req.body;
    if (!nome || !curso) {
        return res.status(400).json({ message: 'Nome e curso são obrigatórios' });
    }
    const novoAluno = { id: novoId, nome, curso };
    alunos.push(novoAluno);
    novoId++;
    res.status(201).json(novoAluno);
});

//PUT /alunos/:id: atualiza o nome e o curso de um aluno existente, utilizando o ID informado na URL.

app.put('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nome, curso } = req.body;
    if (!nome || !curso) {
        return res.status(400).json({ message: 'Nome e curso são obrigatórios' });
    }

// criando variável para a posição do aluno com o ID informado; retorna -1 se não encontrar.

    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);  

    if (alunoIndex === -1) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    alunos[alunoIndex] = { ...alunos[alunoIndex], nome, curso };
    res.status(200).json(alunos[alunoIndex]);
});

//DELETE /alunos/:id: remove um aluno da lista a partir do seu ID.

app.delete('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);

    if (alunoIndex === -1) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    alunos.splice(alunoIndex, 1);
    res.status(204).send(); 
});

//iniciar o servidor

app.listen(port, () => {
    console.log(`Servidor rodando em ${port}`);
});