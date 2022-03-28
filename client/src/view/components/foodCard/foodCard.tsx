import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './favoriteCard.scss'
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { foodObj, getAllRestaurants } from '../../../app/reducers/resterauntsReducer'
import Button from '@mui/material/Button';
import ReserveModal from '../reserveModal/reserveModal';
interface cardProp {
    id: string;
    name: string;
    image: string;
    booking: number;
    region: string;
    stars: number;
    city: string;
    food: Array<foodObj>;
}


function FoodCard(props: cardProp) {
    const restaurants = useAppSelector(getAllRestaurants)
    const [openModal, setOpenModal] = useState(false);
    return (
        <Link to={`/Restaurant/${props.id}`}>
            <div className="restaurantCard">
                <div className="restaurantCard__image" style={{ backgroundImage: `url(${props.image})` }}></div>
                <div className="restaurantCard__main">
                    <div className="restaurantCard__title">
                        <h3>{props.name}</h3>
                    </div>
                    <div className="restaurantCard__city">
                        <span>{props.city}</span>
                    </div>
                    <div className="restaurantCard__price">
                        <span>{props.food[0].name}</span>
                        <span>{props.food[0].price}</span>
                    </div>
                    <div className="restaurantCard__reserve">
                        <Button style={{ backgroundColor: '#2a945b', width: '60%', padding: '0.1rem 0.1rem', whiteSpace: "nowrap" }} variant="contained" >Reserve Now</Button>
                    </div>
                </div>
                <ReserveModal restaurantID={props.id} openModal={openModal} setOpenModal={setOpenModal} />
            </div>
        </Link >
    )
}
export default FoodCard;