/* eslint-disable no-unused-vars */
const userModel = require('../models/user');

function readAllUsers(req, res) {
  return userModel.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Ошибка сервера.' }));
}

function readUser(req, res) {
  const { userId } = req.params;
  return userModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка сервера.' });
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  return userModel.create({ name, about, avatar })
    // eslint-disable-next-line arrow-body-style
    .then((user) => {
      return res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка сервера.' });
    });
}

function updateUser(req, res) {
  // eslint-disable-next-line max-len
  userModel.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about }, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка сервера.' });
    });
}

function updateUserAvatar(req, res) {
  // eslint-disable-next-line max-len
  userModel.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка сервера.' });
    });
}

module.exports = {
  readAllUsers,
  readUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
