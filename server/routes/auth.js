const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await User.findOne({ email });
        if (!candidate) {
            return res.status(200).json({
                message:
                    "There is no such user. Check that the email you entered is correct.",
            });
        }
        const areSame = await bcrypt.compare(password, candidate.password);
        if (!areSame) {
            return res.status(200).json({
                message: "Invalid password.",
            });
        }
        res.status(200).json({
            message: "OK",
            user: candidate,
        });
    } catch (e) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, surname } = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
            return res.status(200).json({
                message: "A user with such an email already exists.",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            name,
            surname,
            password: hashPassword,
            markersToVisit: [],
            markersVisited: [],
            ownMarker: [],
        });
        await user.save();
        return res.status(200).json({ message: "OK" });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

module.exports = router;
