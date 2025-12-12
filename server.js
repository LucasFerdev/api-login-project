import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post('/usuarios', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
        
        res.status(201).json(user)
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao criar usuário", detalhes: erro.message })
    }
})

app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar usuários" })
    }
})

app.put('/usuarios/:id', async (req, res) => {
    try {
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

app.delete('/usuarios/:id', async (req, res) => {
    try {
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

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 🚀")
})