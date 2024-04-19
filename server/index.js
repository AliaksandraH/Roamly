const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const markers = require("./routes/markers");
const auth = require("./routes/auth");
dotenv.config();

const connectDB = require("./connectMongo");

app.use(bodyParser.json());
app.use("/", markers);
app.use("/auth", auth);

const PORT = process.env.PORT || 3000;
async function start() {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
