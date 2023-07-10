const express = require('express')
const connection  = require('./config/config')
const {userRouter} = require('./routes/user.route')
const {restaurantRouter} = require('./routes/restaurant.route')
const {orderRouter} = require('./routes/order.route')
require('dotenv').config()

const app = express()
const port = process.env.port
app.use(express.json())

app.get("/", (req, res) =>{
    res.send("Welcome to Food Delivery...")
})

app.use("/user",userRouter)
app.use("/restaurant",restaurantRouter)
app.use("/order",orderRouter)


app.listen(port,async(req,res)=>{
    try{
        await connection
        console.log("server is running")
    } catch(err){
        console.log(err.message)
        console.log("server is not running.."
        )
    }
    console.log(`server is running on port ${port}`)
})