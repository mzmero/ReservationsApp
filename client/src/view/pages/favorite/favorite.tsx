import React, { useEffect } from 'react';
import Navbar from '../../components/menu/menu';
import './favorite.scss'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/footer/footer'
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { getFavorites, fetchUserFavorite } from '../../../app/reducers/favoriteReducer'
import { fetchAllRestaurants } from '../../../app/reducers/restaurantsReducer'
import Grid from '@mui/material/Grid';
import FavoriteCard from '../../components/favoriteCard/favoriteCard'
import { checkUser } from '../../../app/reducers/userReducer'

function Favorite() {
    const ifUserLogIn = useAppSelector(checkUser)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (ifUserLogIn === false)
            navigate('/')
        dispatch(fetchAllRestaurants())
        dispatch(fetchUserFavorite())
    }, []);
    const favorites = useAppSelector(getFavorites)
    return (
        <div>
            <Navbar></Navbar>
            <div className="favorite">
                <div className="favorite__content">
                    <header className="favorite__content__title">
                        <h2>Your Favorites</h2>
                    </header>
                    <div className="favorite__content__card">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {favorites.map((r, index) => {
                                return (<Grid item xs={12} sm={4} md={3} key={index}>
                                    <FavoriteCard key={r._id} restId={r.restId} />
                                </Grid>)
                            })}
                        </Grid>
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}
export default Favorite;