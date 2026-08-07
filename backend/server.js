const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
// const secret = process.env.JWT_SECRET;
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");

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

// Create Route
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!",
            });
        }

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            message: "User Registered Successfully",
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

});

app.listen(port, () => {
    console.log(`App listening on the given port: ${port}`);
});