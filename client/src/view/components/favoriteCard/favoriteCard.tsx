import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './favoriteCard.scss'
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { getAllRestaurants } from '../../../app/reducers/restaurantsReducer'
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import ReserveModal from '../reserveModal/reserveModal';
interface cardProp {
    restId: string;
}

function FavoriteCard(props: cardProp) {
    const restaurants = useAppSelector(getAllRestaurants)
    const [openModal, setOpenModal] = useState(false);
    const restaurant = restaurants.filter((rest, index) => {
        if (rest._id == props.restId)
            return rest
    })
    let img = ""
    let title = ""
    let city = ""
    if (restaurant.length != 0) {
        img = restaurant[0].image;
        title = restaurant[0].name;
        city = restaurant[0].city;
    }
    function openReserve(e: any) {
        e.preventDefault();
        setOpenModal(true);
    }
    return (
        <Link to={`/Restaurant/${props.restId}`}>
            <div className="restaurantCard">
                <div className="restaurantCard__image" style={{ backgroundImage: `url(${img})` }}></div>
                <div className="restaurantCard__main">
                    <div className="restaurantCard__title">
                        <h3>{title}</h3>
                    </div>
                    <div className="restaurantCard__city">
                        <span>{city}</span>
                    </div>
                    <div className="restaurantCard__reserve">
                        <Button style={{ backgroundColor: '#2a945b', width: '60%', padding: '0.1rem 0.1rem', whiteSpace: "nowrap" }} variant="contained" onClick={openReserve}>Reserve Now</Button>
                    </div>
                </div>
                <ReserveModal restaurantID={props.restId} name={title} image={img} openModal={openModal} setOpenModal={setOpenModal} />
            </div>
        </Link >
    )
}
export default FavoriteCard;