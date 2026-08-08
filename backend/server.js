const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/auth.js");

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
const secret = process.env.JWT_SECRET;

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

        const existingUser = await User.findOne({ email });

        if (existingUser) {
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

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required!",
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
        return res.status(400).json({
            message: "Password is incorrect",
        });
    }

    const token = jwt.sign(
        { userId: user._id },
        secret,
        { expiresIn: "1h" },
    );

    return res.status(200).json({
        message: "Login Successful",
        token,
    });

});

app.get("/profile", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Profile accessed successfully",
        userId: req.userId,
    });
});

app.listen(port, () => {
    console.log(`App listening on the given port: ${port}`);
});