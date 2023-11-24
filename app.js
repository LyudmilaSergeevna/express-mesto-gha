/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '655f9d62666b92098f50be5c',
  };
  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
});

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('MongoDB connected');
  });

app.listen(PORT, () => {
  console.log('Server started on port 3000');
});
