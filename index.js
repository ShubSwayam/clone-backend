require('dotenv').config()
require('./database/db');
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT
app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/userRoute"));

app.listen(port, () => {
    console.log("Server is On", port)
})