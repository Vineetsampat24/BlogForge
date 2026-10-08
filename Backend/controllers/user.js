import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashpassword = await bcrypt.hash(password, 10)

         const exist = await User.findOne({ email })
        if (exist) {
            res.status(401).json({ error: "Already Signup" })
        }

        const user = await User.create({ username, email, password: hashpassword })
        res.status(201).json({ message: "signup successfully", user })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ error: "invalid credentials" })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET
        )

        res.status(201).json({ message: "login successfully", token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ username: 1 });

        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({ error: "Invalid role." });
        }

        if (req.params.id === req.user.id) {
            return res.status(400).json({
                error: "You cannot change your own role.",
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ message: "User role updated.", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};