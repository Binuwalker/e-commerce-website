const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please mention product name"],
        maxlength: [100, "Product name cannot be more than 100 characters"]
    },
    price: {
        type: Number,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please mention product category"],
        enum: {
            values: [
                'Action',
                'Arcade',
                'Editors-Choice',
                "Fantasy",
                'Fighting',
                'Mystery',
                'Puzzle',
                'Racing',
                'Role-Play',
                'Sci-Fi',
                'Shooting',
                'Simulation',
                'Stratergy',
                'Survival',
                'Treasure',
                'War'
            ],
            message: "Please select correct catogory"
        }
    },
    seller: {
        type: String,
        required: [true, "Please mention product seller"]
    },
    stock: {
        type: Number,
        required: [true, "Please mention product stock"],
        maxlength: [20, "Product stock cannot exceed 20"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId
            },
            rating: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('product', productSchema)

module.exports = schema;