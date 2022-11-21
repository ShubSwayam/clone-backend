require('dotenv').config();
const mongoose = require("mongoose");

const URI = process.env.MONGOURL

mongoose.connect(URI, (res) => {
    try {
        console.log("Database connected");
    } catch (error) {
        return res.status(400).json({ success: false, msg: error })
    }
})