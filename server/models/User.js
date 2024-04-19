const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    markersToVisit: [String],
    markersVisited: [String],
    ownMarker: [
        {
            name: {
                type: String,
                required: true,
            },
            type: {
                type: Array,
                required: true,
                default: ["markersToVisit"],
            },
            own: {
                type: Boolean,
                required: true,
                default: true,
            },
            rating: {
                type: Number,
                required: true,
                default: 0.1,
            },
            location: {
                latitude: {
                    type: Number,
                    required: true,
                    default: 0.1,
                },
                longitude: {
                    type: Number,
                    required: true,
                    default: 0.1,
                },
            },
        },
    ],
});

module.exports = model("User", userSchema);
