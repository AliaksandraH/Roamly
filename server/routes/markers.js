const { Router } = require("express");
const router = Router();
const User = require("../models/User");

router.get("/getMarkers/:id", async (req, res) => {
    try {
        const { typeMarker } = req.body;
        const markers = await User.findById(req.params.id);
        res.status(200).json(markers[typeMarker]);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

router.post("/addOrDeleteMarker/:id", async (req, res) => {
    try {
        const { markerId, typeMarker } = req.body;
        const user = await User.findById(req.params.id);
        const markerIndex = user[typeMarker].indexOf(markerId);
        if (markerIndex !== -1) {
            user[typeMarker].splice(markerIndex, 1);
        } else {
            user[typeMarker].push(markerId);
        }
        await user.save();
        res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

router.post("/getOwnMarker/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { markerId } = req.body;
        const marker = user.ownMarker.find(
            (el) => el._id.toString() === markerId
        );
        res.status(200).json(marker);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

router.post("/addOwnMarker/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.ownMarker.push(req.body);
        await user.save();
        const addedOwnMarker = user.ownMarker.at(-1);
        res.status(200).json({ message: "OK", data: addedOwnMarker });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

router.post("/changeOwnMarker/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { id } = req.body;
        delete req.body.id;
        const markerToUpdate = user.ownMarker.id(id);
        markerToUpdate.set(req.body);
        await user.save();
        res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

router.post("/deleteOwnMarker/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.ownMarker.pull(req.body.id);
        await user.save();
        res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

module.exports = router;
