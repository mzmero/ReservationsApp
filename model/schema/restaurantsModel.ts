
const mongoose = require("mongoose");
interface foodObj {
    name: string;

}
const RestaurantsSchema = new mongoose.Schema({
    id: String,
    name: String,
    image: String,
    booking: Number,
    region: String,
    stars: Number,
    city: String,
    category: String,
    photos: [{
        type: String
    }],
    open: String,
    close: String,
    description: String,
    subCategory: [{
        type: String
    }],
    ownerId: String,
    food: [{
        name: String,
        price: Number,
    }]
});

const Resteraunts = mongoose.model('restaurants', RestaurantsSchema);
export default Resteraunts