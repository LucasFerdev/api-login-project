import express from 'express';

const app = express();
app.use(express.json())

const users = []

app.post('/usuarios' , (req, res) => {

  users.push(req.body)

  res.send('Usuário criado com sucesso')
  
})



app.get('/usuarios',  (req, res) => {
  res.json(users)

})

app.listen(3000)

/*
  Lista de objetivos a serem alcançados:

  - Criar um usuário
  - Listar todos os usuários
  - Editar um usuário
  - Deletar um usuário
*/

