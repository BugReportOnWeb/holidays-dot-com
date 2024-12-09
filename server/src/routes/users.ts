import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId).select("-password");
        if (!user) return res.status(404).json({ message: "User doesn't exist." });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occured" });
    }
});

router.post(
    "/register",
    [
        check("firstName", "First Name is required").isString(),
        check("lastName", "Last Name is required").isString(),
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({
            min: 6,
        }),
    ],
    async (req: Request, res: Response) => {
        // Check for form validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

        try {
            // Check for existing user
            let user = await User.findOne({ email: req.body.email });
            if (user) return res.status(409).json({ message: "User already exists." });

            user = new User(req.body);
            await user.save();

            // Signing JWT token
            const payload = { userId: user.id };
            const jwtOptions = { expiresIn: "2d" };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, jwtOptions)

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000,
            });

            return res.status(200).send({ message: "User registered." });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Server error occured." });
        }
    }
);

export default router;
