const express = require('express')
const Restaurant = require('../models/restaurant.model')
const User = require('../models/user.model')
const jwt =  require("jsonwebtoken")
const bcrypt = require('bcrypt')
require('dotenv').config()

const restaurantRouter = express.Router()

restaurantRouter.get('/',(req,res)=>{
    res.send("Welcome to the restaurant!!")
})

//restaurants are created
restaurantRouter.post("/restaurants", async (req, res) => {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.send("Resturant added successfully");
});

// Get all restaurants
restaurantRouter.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        return res.status(200).json(restaurants);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});
  
// Get a specific restaurant by ID
restaurantRouter.get('/api/restaurants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        return res.status(200).json(restaurant);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});
  
// Get menu of a specific restaurant by ID
restaurantRouter.get('/api/restaurants/:id/menu', async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        return res.status(200).json(restaurant.menu);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});
  
// Add a new item to a specific restaurant's menu
restaurantRouter.post('/api/restaurants/:id/menu', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image } = req.body;
    
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
    
        // Create a new menu item
        const menuItem = {
            name,
            description,
            price,
            image
        };
    
        restaurant.menu.push(menuItem);
        await restaurant.save();
    
        return res.status(201).json({ message: 'Menu item added successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});
  
// Delete a menu item from a specific restaurant
restaurantRouter.delete('/api/restaurants/:restaurantId/menu/:itemId', async (req, res) => {
    try {
        const { restaurantId, itemId } = req.params;
    
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
    
        const menuItemIndex = restaurant.menu.findIndex(item => item._id.toString() === itemId);
        if (menuItemIndex === -1) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
    
        restaurant.menu.splice(menuItemIndex, 1);
        await restaurant.save();
    
        return res.status(202).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = {restaurantRouter}