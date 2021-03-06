import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './foodCard.scss'
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { foodObj, getAllRestaurants } from '../../../app/reducers/restaurantsReducer'
import Button from '@mui/material/Button';
import ReserveModal from '../reserveModal/reserveModal';
interface cardProp {
    _id: string;
    name: string;
    image: string;
    region: string;
    stars: number;
    city: string;
    food: Array<foodObj>;
}


function FoodCard(props: cardProp) {
    const restaurants = useAppSelector(getAllRestaurants)
    const [openModal, setOpenModal] = useState(false);
    function openReserve(e: any) {
        e.preventDefault()
        e.stopPropagation()
        setOpenModal(true);
    }
    return (
        <Link to={`/Restaurant/${props._id}`}>
            <div className="foodCard">
                <div className="foodCard__image" style={{ backgroundImage: `url(${props.image})` }}></div>
                <div className="foodCard__main">
                    <div className="foodCard__title">
                        <h3>{props.name}</h3>
                    </div>
                    <div className="foodCard__city">
                        <span>{props.city}</span>
                    </div>
                    <div className="foodCard__price">
                        <span>{props.food[0].name}</span>
                        <span>{props.food[0].price + "$"}</span>
                    </div>
                    <div className="foodCard__reserve">
                        <Button style={{ backgroundColor: '#2a945b', width: '60%', padding: '0.1rem 0.1rem', whiteSpace: "nowrap" }} variant="contained" onClick={openReserve} >Reserve Now</Button>
                    </div>
                </div>
                <ReserveModal restaurantID={props._id} image={props.image} name={props.name} openModal={openModal} setOpenModal={setOpenModal} />
            </div>
        </Link >
    )
}
export default FoodCard;