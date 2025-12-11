import express from 'express'
import { PrismaClient } from '@prisma/client'

// Inicia a conexão com o banco
const prisma = new PrismaClient()
const app = express()

// Habilita o uso de JSON nas requisições
app.use(express.json())

// Rota para CRIAR um usuário (POST)
app.post('/usuarios', async (req, res) => {
    try {
        // Tenta criar um novo usuário no banco com os dados enviados
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
        
        // Deu certo? Retorna o usuário criado (Status 201 = Criado)
        res.status(201).json(user)
    } catch (erro) {
        // Deu errado? Retorna o erro (Status 500 = Erro do Servidor)
        // Isso acontece se tentar criar um email que já existe, por exemplo.
        res.status(500).json({ mensagem: "Erro ao criar usuário", detalhes: erro.message })
    }
})

// Rota para LISTAR todos os usuários (GET)
app.get('/usuarios', async (req, res) => {
    try {
        // Busca todos os registros na tabela 'user'
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar usuários" })
    }
})

// Rota para EDITAR um usuário (PUT)
app.put('/usuarios/:id', async (req, res) => {
    try {
        // Atualiza o usuário onde o ID for igual ao enviado na URL
        const user = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
        res.status(200).json(user)
    } catch (erro) {
        res.status(404).json({ mensagem: "Usuário não encontrado para edição" })
    }
})

// Rota para DELETAR um usuário (DELETE)
app.delete('/usuarios/:id', async (req, res) => {
    try {
        // Deleta o usuário pelo ID
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ mensagem: "Usuário deletado com sucesso" })
    } catch (erro) {
        res.status(404).json({ mensagem: "Usuário não encontrado para deletar" })
    }
})

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 🚀")
})