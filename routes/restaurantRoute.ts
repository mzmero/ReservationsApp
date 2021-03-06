const express = require('express');
const router = express.Router();
import Restaurants from '../model/schema/restaurantsModel'
import Regions from '../model/schema/regionModel'
import Reservations from '../model/schema/reservationsmModel';
import Reviews from '../model/schema/reviewModel'
import { isUser } from '../controller/userController'

router.get('/get-all-restaurants', async (req, res) => {
    try {
        const restaurant = await Restaurants.find({});
        res.send({ restaurant })
    } catch (error) {
        res.send({ error });
    }

})
router.get('/get-all-owner-restaurants', isUser, async (req, res) => {
    try {
        const ownerId = req.userId
        const role = req.role
        if (role === "restaurateur") {
            const restaurant = await Restaurants.find({ "ownerId": ownerId });
            const filterRestaurants = restaurant.map((a) => { return a._id })
            const newDate = new Date()
            const nextMonth = new Date(newDate)
            nextMonth.setDate(nextMonth.getDate() + 30)
            const prevMonth = new Date(newDate)
            prevMonth.setDate(prevMonth.getDate() - 30)
            const reserves = await Reservations.find({
                "restId": { $in: filterRestaurants }, "date": {
                    $gte: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate()),
                    $lt: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate())
                }
            }, '-_id restId date')
            res.send({ restaurant, reserves })
        } else res.status(401).send({ error: "Not authorized" });
    } catch (error) {
        res.send({ error });
    }

})

router.post('/get-famous-restaurants', async (req, res) => {
    try {
        const { region } = req.body
        if (!region) throw 'invalid fields'
        const restaurant = await Restaurants.find({ "region": region });
        res.send({ restaurant })
    } catch (error) {
        res.send({ error });
    }

})
router.post('/post-review', isUser, async (req, res) => {
    try {
        const { comment, stars, name, restId } = req.body
        const userId = req.userId
        if (!comment || !stars || !name) throw "invalid fields"
        const date = new Date()
        const review = new Reviews({ "date": date, "comment": comment, "stars": stars, "name": name, "userId": userId, "restId": restId });
        await review.save()
        res.send({ reviews: review })
    } catch (error) {
        res.send({ error });
    }

})

router.get('/get-regions', async (req, res) => {
    try {
        const regions = await Regions.find({});
        res.send({ regions })
    } catch (error) {
        res.send({ error });
    }

})
router.post('/get-previews', async (req, res) => {
    try {
        const { restId } = req.body
        const reviews = await Reviews.find({ "restId": restId });
        res.send({ reviews })
    } catch (error) {
        res.send({ error });
    }

})
module.exports = router;
