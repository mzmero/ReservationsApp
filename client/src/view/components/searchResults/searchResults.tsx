import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllRestaurants, fetchAllRestaurants } from '../../../app/reducers/resterauntsReducer';
import RestaurantCard from '../restaurantCard/restaurantCard';
import './searchResults.scss'

interface LocationState {
    prop: string;
}
export const SearchResults = () => {
    const { SearchString } = useParams()
    const arrOfRestaurants = useAppSelector(getAllRestaurants)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const location = useLocation()
    const itemsInPage = 4;
    const [pageProps, setPageProps] = useState({ totalPages: 1, numOfItems: 0, data: [] as any, start: 0, end: 1, category: "" })
    useEffect(() => {
        if (arrOfRestaurants.length == 0)
            dispatch(fetchAllRestaurants())
        if (location.state == null)
            navigate('/search')
    }, [])

    function handlePages(e: any, page: number) {
        const startIndex = itemsInPage * (page - 1)
        let endIndex = itemsInPage * (page - 1)
        if (pageProps.totalPages > page)
            endIndex = itemsInPage * (page)
        else if (pageProps.numOfItems % itemsInPage != 0)
            endIndex = itemsInPage * (page - 1) + pageProps.numOfItems % itemsInPage
        else endIndex = itemsInPage * (page)
        setPageProps({ ...pageProps, "start": startIndex, "end": endIndex })

    }
    useEffect(() => {
        if (location.state != null) {
            let { prop } = location.state as LocationState;
            const result = arrOfRestaurants.filter((r) => {
                if (SearchString != null) {
                    if (prop === "restaurant") {
                        const index = r.name.toLowerCase().indexOf(SearchString.toLowerCase())
                        if (index >= 0)
                            return r;
                    } else if (prop === "food") {
                        for (let f of r.food) {
                            if (f.name.toLowerCase().indexOf(SearchString.toLowerCase()) >= 0) {
                                return ({ "id": r.id, "name": r.name, "image": r.image, "booking": r.booking, "region": r.region, "stars": r.stars, "category": r.category, "photos": r.photos, "city": r.city, "open": r.open, "close": r.close, "description": r.description, "subCategory": r.subCategory, "ownerId": r.ownerId, "food": [{ "name": f.name, "price": f.price }] })
                            }
                        }
                    }
                }
            });
            if (prop === "food") {
                result.sort(function (a, b) {
                    return a.food[0].price - b.food[0].price;
                });
            }
            const numOfItems = result.length
            const totalPages = Math.ceil(numOfItems / itemsInPage)
            let start = 0;
            let end = 1;
            if (totalPages === 1)
                end = numOfItems;
            else end = itemsInPage;
            setPageProps({ "numOfItems": numOfItems, "totalPages": totalPages, "data": result, "start": start, "end": end, "category": prop })
        }
    }, [SearchString, arrOfRestaurants, location.state])
    let component
    if (pageProps.category == "restaurant") {
        component = (<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
            {pageProps.data.slice(pageProps.start, pageProps.end).map((rest: any, index: any) => (
                <Grid item xs={12} sm={4} md={3} key={rest.id}>
                    <RestaurantCard key={rest.id} id={rest.id} name={rest.name} image={rest.image} booking={rest.booking} stars={rest.stars} region={rest.region} city={rest.city}></RestaurantCard>
                </Grid>
            ))}
        </Grid>)
    } else {
        component = (<div></div>)
    }
    return (
        <div className="searchresults">
            <div className="searchresults__title">
                <h2>Search Results for {SearchString}</h2>
            </div>
            <div className="searchresults__results">
                {component}
            </div>
            <div className='searchresults__pages'>
                <Pagination onChange={handlePages} count={pageProps.totalPages} color="primary" style={{ marginBottom: "1rem" }} />
            </div>
        </div>
    )
}