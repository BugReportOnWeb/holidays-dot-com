import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
    "/login",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({
            min: 6,
        }),
    ],
    async (req: Request, res: Response) => {
        // Check for form validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

        const { email, password } = req.body;

        try {
            // Check for user existance
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "User doesn't exist." });

            // Check for correct password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Wrong Password." });

            // Signing JWT token
            const payload = { userId: user.id };
            const jwtOptions = { expiresIn: "2d" };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, jwtOptions)

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000,
            });

            res.status(200).json({ userId: user._id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error occured." });
        }
    }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
});

router.post("/logout", (_req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });

    res.send();
});

export default router;
