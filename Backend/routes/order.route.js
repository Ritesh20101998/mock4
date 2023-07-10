const express = require('express');
const User = require('../models/user.model')
const Restaurant = require('../models/restaurant.model')
const Order = require('../models/order.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const orderRouter = express.Router()

orderRouter.get('/',(req,res)=>{
    res.send('Welcome to the order service')
})

// Place an order
orderRouter.post('/api/orders', async (req, res) => {
    try {
        const { user, restaurant, items, totalPrice, deliveryAddress } = req.body;
    
        const order = new Order({
            user,
            restaurant,
            items,
            totalPrice,
            deliveryAddress,
            status: 'placed'
        });
    
        await order.save();
    
        return res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});
  
// Get a specific order by ID
orderRouter.get('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const order = await Order.findById(id)
            .populate('user')
            .populate('restaurant');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
    
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});
  
// Update the status of a specific order
orderRouter.put('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
    
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
    
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = {orderRouter}