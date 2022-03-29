import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './restaurant.scss'
import Menu from '../../components/menu/menu'
import Footer from '../../components/footer/footer'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ReserveModal from '../../components/reserveModal/reserveModal'
import { getAllRestaurants, fetchAllRestaurants, postReview, getReviews, getAllReviews } from '../../../app/reducers/restaurantsReducer'
import { addFavorite, fetchUserFavorite, deleteFavorite, getFavorites } from '../../../app/reducers/favoriteReducer'
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import Chip from '@mui/material/Chip';
import Map from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import ScrollIntoView from "../../components/ScrollIntoView/ScrollIntoView";
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { checkUser, selecUserName } from '../../../app/reducers/userReducer';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Review from '../../components/review/review'

function Restaurant() {
    const dispatch = useAppDispatch()
    const { RestaurantId } = useParams();
    const restaurants = useAppSelector(getAllRestaurants)
    const allReviews = useAppSelector(getAllReviews)
    const islogIn = useAppSelector(checkUser)
    const userName = useAppSelector(selecUserName)
    useEffect(() => {
        if (restaurants.length == 0)
            dispatch(fetchAllRestaurants())
        dispatch(getReviews({ "restId": RestaurantId }))
    }, []);
    useEffect(() => {
        if (islogIn == true)
            dispatch(fetchUserFavorite())
    }, [islogIn])
    const [Restaurant, setRestaurant] = useState({ _id: "0", name: "", image: "", booking: 0, region: "", stars: 0, category: "", photos: ["/", "/"], city: "", open: "", close: "", description: "", subCategory: [], ownerId: "", food: [{ name: "", price: 0 }] })
    const [reviewProps, setReviewProps] = useState({ "comment": "", "stars": 0 })
    const [openModal, setOpenModal] = useState(false);
    const favorites = useAppSelector(getFavorites)
    const [checked, setChecked] = React.useState(false);
    let restaurant = restaurants.filter((rest) => {
        if (rest._id == RestaurantId)
            return rest
    })
    const favorite = favorites.filter((fav) => {
        if (fav.restId == RestaurantId)
            return fav
    })
    if (restaurant.length == 0)
        restaurant = [Restaurant];
    if (favorite.length > 0 && checked === false) {
        setChecked(true)
    }
    if (favorite.length == 0 && checked === true) {
        setChecked(false)
    }
    function isFavorite(e: any) {
        if (islogIn) {
            if (e.target.checked) {
                dispatch(addFavorite({ 'restId': RestaurantId }))
            }
            else {
                dispatch(deleteFavorite({ "restId": RestaurantId }))
                setChecked(false)
            }
        } else {

        }
    }
    function openReserve(e: any) {
        e.preventDefault();
        setOpenModal(true);
    }
    function handleCommentChange(e: any) {
        setReviewProps({ ...reviewProps, "comment": e.target.value })
    }
    function handleReview() {
        if (islogIn)
            dispatch(postReview({ "comment": reviewProps.comment, "stars": reviewProps.stars, "name": userName, "restId": RestaurantId }))
    }
    return (
        <ScrollIntoView>
            <div>
                <Menu></Menu>
                <div className="rest">
                    <div className="rest__images">
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={0}
                            slidesPerGroup={2}
                            loop={false}
                            loopFillGroupWithBlank={false}
                            pagination={{
                                clickable: true
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper_rest"
                            //centeredSlides={true}
                            centeredSlidesBounds={true}
                            breakpoints={{
                                280: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                    slidesPerGroup: 1,

                                },
                                600: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                    slidesPerGroup: 2
                                },
                                800: {
                                    slidesPerView: 2,
                                    spaceBetween: 30
                                },
                                1200: {
                                    slidesPerView: 2,
                                    spaceBetween: 40
                                }
                            }}
                        >
                            {restaurant[0].photos.map((rest, index) => {
                                return (
                                    <SwiperSlide key={(index + 1) * 100}> <div className="rest__images__photo" style={{ backgroundImage: `url(${rest})` }}></div></SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <div className="rest__main">
                        <div className="rest__main__header">
                            <div className="rest__main__header__left">
                                <img src={restaurant[0].image} alt="restaurant"></img>
                                <div className="rest__main__header__left__title">
                                    <h1>{restaurant[0].name}</h1>
                                    <div className="rest__main__header__left__title__category">
                                        <span>{restaurant[0].region}</span>
                                        <span className="dot"></span>
                                        <span>{restaurant[0].city}</span>
                                        <span className="dot"></span>
                                        <span>{restaurant[0].category.toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="rest__main__header__left__favorite">
                                    <Checkbox checked={checked} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={isFavorite} />
                                </div>
                            </div>
                            <div className="rest__main__header__right">
                                <Button style={{ backgroundColor: '#2a945b' }} fullWidth variant="contained" onClick={openReserve}>Check Availability</Button>
                                <div className="rest__main__header__right__openings">
                                    <h3>Hours</h3>
                                    <h4>Sunday-Friday</h4>
                                    <span>{restaurant[0].open}-{restaurant[0].close}</span>
                                </div>
                            </div>
                        </div>
                        <div className="rest__main__body">
                            <div className="rest__main__body__description">
                                <h2>Description</h2>
                                <span>{restaurant[0].description}</span>
                                <div className="rest__main__body__description__sub">
                                    {restaurant[0].subCategory.map((s: string, index) => {
                                        return <Chip key={index} label={s} style={{ marginRight: "0.4rem" }} />
                                    })}
                                </div>
                            </div>
                            <div className="rest__main__body__location">
                                <h2>Location</h2>
                                <Map mapLib={maplibregl} initialViewState={{
                                    longitude: -122.4,
                                    latitude: 37.8,
                                    zoom: 1
                                }}
                                    style={{ width: "50vw", height: 400, minWidth: "22rem" }}
                                    mapStyle="https://demotiles.maplibre.org/style.json"
                                />
                            </div>
                        </div>
                        <div className="rest__main__review">
                            <div className="rest__main__review__title">
                                What People are Saying
                            </div>
                            <div className="rest__main__review__comment">
                                <TextField fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Write a Review..."
                                    multiline
                                    maxRows={4}
                                    sx={{ maxWidth: "30rem" }}
                                    value={reviewProps.comment}
                                    onChange={handleCommentChange}
                                />
                                <Rating
                                    name="simple-controlled"
                                    value={reviewProps.stars}
                                    sx={{ marginLeft: "1rem" }}
                                    onChange={(event, newValue) => {
                                        if (newValue != null)
                                            setReviewProps({ ...reviewProps, "stars": newValue });
                                    }}
                                />
                            </div>
                            <div className="rest__main__review__comment">
                                <Button fullWidth style={{ maxWidth: "10rem" }} variant="contained" onClick={handleReview} >Post</Button>
                            </div>
                            <div className="rest__main__review__allreview">
                                {allReviews.map((review, index) => {
                                    return (
                                        <Review key={review._id} _id={review._id} name={review.name} date={review.date} userId={review.userId} comment={review.comment} restId={review.restId} stars={review.stars}></Review>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div >
                <ReserveModal restaurantID={RestaurantId} image={restaurant[0].image} name={restaurant[0].name} openModal={openModal} setOpenModal={setOpenModal} />
                <Footer />
            </div >
        </ScrollIntoView>
    )
}

export default Restaurant