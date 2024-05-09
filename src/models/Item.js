const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: {
        main: {
            type: String,
            required: true
        },
        sub: {
            type: String,
            required: true
        }
    },
    images: {
        type: [String],
        validate: {
            validator: function(v) {
                return v.length <= 4; 
            },
            message: 'Exceeds the limit of 4 images'
        }
    }
});

module.exports = mongoose.model('Item', itemSchema);
