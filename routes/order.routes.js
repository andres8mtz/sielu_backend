const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');
const mongoose = require('mongoose');

// GET /orders - Get all orders
router.get('/orders', (req, res, next) => {
  Order.find()
    .then((allOrders) => res.json(allOrders))
    .catch((err) => {
      console.log('Error while getting the orders', err);
      res.status(500).json({ message: 'Error while getting the orders' });
    });
});

// POST /orders - Create a new order 
router.post('orders/user/:id', (req, res, next) => {
  const { userId, products } = req.body;

  Order.create({ userId, products })
    .then((newOrder) => res.status(201).json(newOrder))
    .catch((err) => {
      console.log('Error while creating a new order', err);
      res.status(500).json({ message: 'Error while creating a new order' });
    });
});

router.get('/orders/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Order.findById(id)
    .then((order) => {
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.json(order);
      }
    })
    .catch((err) => {
      console.log('Error while getting order', err);
      res.status(500).json({ message: 'Error while getting order' });
    });
}
);

// PUT /orders/:id - Update an order
router.put('/orders/:id', (req, res, next) => {
  const { id } = req.params;
  const { userId, products } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Order.findByIdAndUpdate(id, { userId, products }, { new: true })
    .then((updatedOrder) => {
      if (!updatedOrder) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.json(updatedOrder);
      }
    })
    .catch((err) => {
      console.log('Error while updating order', err);
      res.status(500).json({ message: 'Error while updating order' });
    });
}
);

module.exports = router;
