const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
// const secret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());

main()
    .then(() => {
        console.log("MongoDB connected successfully");
    }).catch((err) => {
        console.error("Database Error:", err);
    });

async function main() {
    await mongoose.connect(mongoURI);
}

app.listen(port, () => {
    console.log(`App listening on the given port: ${port}`);
});