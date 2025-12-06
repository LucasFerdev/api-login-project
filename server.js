import express from 'express';

const app = express();

app.get('/usuarios',  (req, res) => {
  res.send('Lista de usuarios')
})

app.listen(3000)