import React, { useState, useEffect } from 'react'
import Card from '../../components/restaurantCard/restaurantCard';
import Search from '../../components/search/search'
import Navbar from '../../components/menu/menu';
import Footer from '../../components/footer/footer';
import Location from './location.svg'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { getFamousRestaurants, fetchFamousRestaurants, getRegions, fetchRegion } from '../../../app/reducers/restaurantsReducer'
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './explore.scss'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from 'react-router-dom';
import { selectDefaultRegion, setUserRegion } from '../../../app/reducers/userReducer';
import Grid from '@mui/material/Grid';

function Explore() {
    const dispatch = useAppDispatch()
    const famousRestaurants = useAppSelector(getFamousRestaurants)
    const arrOfRegions = useAppSelector(getRegions)
    const [trendingRestaurants, setTrendingRestaurant] = useState([{ _id: "0", name: "", image: "", booking: 0, region: "", stars: 0, city: "" }]);
    const userRegion = useAppSelector(selectDefaultRegion)
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    useEffect(() => {
        dispatch(fetchFamousRestaurants(userRegion))
        dispatch(fetchRegion())
    }, []);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e: any) => {
        setAnchorEl(null);
        if (Object.keys(e.currentTarget.dataset).length != 0) {
            dispatch(setUserRegion(e.target.dataset.myValue))
            const newRegion = e.target.dataset.myValue
            dispatch(fetchFamousRestaurants(newRegion))
        }
    };
    const pictureOfRegion = arrOfRegions.filter((e) => {
        if (e.region === userRegion)
            return e
    })
    let img = ""
    if (pictureOfRegion.length > 0)
        img = pictureOfRegion[0].url
    const stringArr = localStorage.getItem("recent")
    let allviewComp
    if (stringArr != null) {
        const recentView: Array<any> = JSON.parse(stringArr);
        allviewComp = (<div className="exploremain__popular">
            <header className='exploremain__popular__title'>
                <h2>Your Recent Views</h2>
            </header>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {recentView.slice(0, 4).map((rest, index) => {
                    return (<Grid item xs={12} sm={4} md={3} key={index}>
                        <Card key={rest._id + "s" + index} _id={rest._id} name={rest.name} image={rest.image} booking={rest.booking} stars={rest.stars} region={rest.region} city={rest.city}></Card>
                    </Grid>)

                })}
            </Grid>
        </div>)

    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="exploremain">
                <div className="exploremain__region" style={{ backgroundImage: `url(${img})` }}>
                    <div className="exploremain__region__title">Reserve at the best restaurants in {userRegion}</div></div>
                <div className="exploremain__location">
                    <h5>It looks like you're in {userRegion}. Not Correct?</h5>
                    <div className="exploremain__location__get">
                        <img src={Location}></img>
                        <div>
                            <Button
                                id="basic-button"
                                style={{ color: "#2a945b" }}
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Get Current Location
                            </Button>
                            <Menu
                                id="basic-menu"
                                PaperProps={{
                                    style: { width: "12rem" }
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem data-my-value='Israel' onClick={handleClose}>Israel</MenuItem>
                                <MenuItem data-my-value='UK' onClick={handleClose}>UK</MenuItem>
                                <MenuItem data-my-value='USA' onClick={handleClose}>USA</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
                {allviewComp}
                <div className="exploremain__popular">
                    <header className='exploremain__popular__title'>
                        <h2>Popular Restaurants in {userRegion}</h2>
                        <h4 onClick={() => { navigate('/viewAll', { state: { "data": famousRestaurants, "title": "Check Popular Restaurants in Your Region" } }) }}>View All</h4>
                    </header>
                    <div className="exploremain__popular__grid">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={0}
                            slidesPerGroup={2}
                            loop={false}
                            loopFillGroupWithBlank={false}
                            pagination={{
                                clickable: true
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
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
                                // when window width is >= 480px
                                800: {
                                    slidesPerView: 3,
                                    spaceBetween: 30
                                },
                                // when window width is >= 640px
                                1200: {
                                    slidesPerView: 4,
                                    spaceBetween: 40
                                }
                            }}
                        >
                            {famousRestaurants.slice(0, 20).map((rest, index) => {
                                return (
                                    <SwiperSlide key={(index + 1) * 1000}><Card key={rest._id + " " + index} _id={rest._id} name={rest.name} image={rest.image} booking={rest.booking} stars={rest.stars} region={rest.region} city={rest.city}></Card></SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <div className='exploremain__popular__grid__arrows'><ArrowBackIcon /><span>Swipe</span><ArrowForwardIcon /></div>
                </div>
                <div className="exploremain__popular">
                    <header className='exploremain__popular__title'>
                        <h2>Trending Restaurants in {userRegion}</h2>
                        <h4 onClick={() => { navigate('/viewAll', { state: { "data": trendingRestaurants, "title": "Check Today Current Trending Restaurants" } }) }}>View All</h4>
                    </header>
                    <div className="exploremain__popular__grid">
                        {trendingRestaurants.map((rest, index) => {
                            return <Card key={rest._id} _id={rest._id} name={rest.name} image={rest.image} booking={rest.booking} stars={rest.stars} region={rest.region} city={rest.city}></Card>
                        })}
                    </div>
                </div>
                <div className="exploremain__restaurateurs">
                    <div className="exploremain__restaurateurs__background">
                        <div className="exploremain__restaurateurs__background__color"></div>
                        <h2>Restaurateurs Join Us</h2>
                        <h3> Join More Than X Restaurants which fill seats and manage reservations</h3>
                        <button className="exploremain__restaurateurs__background__btn">Learn More</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div >
    );
}

export default Explore