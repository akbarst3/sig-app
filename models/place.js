const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Place name is required']
    },
    lat: {
        type: Number,
        required: [true, 'Latitude is required']
    },
    lng: {
        type: Number,
        required: [true, 'Longitude is required']
    },
},
    {
        timestamps: true
    },
)

module.exports = mongoose.model('Place', placeSchema)