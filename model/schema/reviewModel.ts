
const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
    comment: String,
    name: String,
    date: Date,
    userId: String,
    restId: String,
    stars: Number,
});

const Reviews = mongoose.model('reviews', reviewsSchema);


export default Reviews