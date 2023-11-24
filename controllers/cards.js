/* eslint-disable no-unused-vars */
const cardModel = require('../models/card');

function readAllCards(req, res) {
  return cardModel.find()
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: 'Ошибка сервера.' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  return cardModel.create({ name, link, owner: req.user._id })
    // eslint-disable-next-line arrow-body-style
    .then((card) => {
      return res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка сервера.' });
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  cardModel.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка сервера.' });
    });
}

function likeCard(req, res) {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка сервера.' });
    });
}

function dislikeCard(req, res) {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка сервера.' });
    });
}

module.exports = {
  readAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
