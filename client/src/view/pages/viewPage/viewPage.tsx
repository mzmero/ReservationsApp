import React, { useEffect, useState } from 'react'
import Navbar from '../../components/menu/menu'
import "./viewPage.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import RestaurantCard from '../../components/restaurantCard/restaurantCard';
import Footer from '../../components/footer/footer';

interface LocationState {
    data: Array<any>;
    title: string;
}

function ViewPage() {
    const location = useLocation()
    const navigate = useNavigate()
    let itemsInPage = 12;
    const [pageProps, setPageProps] = useState({ totalPages: 1, numOfItems: 0, data: [] as any, title: "", start: 0, end: 1 })
    useEffect(() => {
        if (location.state == null)
            navigate('/')
        const { data, title } = location.state as LocationState;
        const numOfItems = data.length
        const totalPages = Math.ceil(numOfItems / itemsInPage)
        const start = 0;
        let end = 1;
        if (totalPages === 1)
            end = numOfItems;
        else end = itemsInPage;
        setPageProps({ "title": title, "numOfItems": numOfItems, "totalPages": totalPages, "data": data, "start": start, "end": end })
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
    return (
        <div className='viewpage'>
            <Navbar></Navbar>
            <div className='viewpage__content'>
                <div className='viewpage__content__title'>
                    <h2>Reserve At The {pageProps.title} Restaurants</h2>
                </div>
                <div className='viewpage__content__rest'>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
                        {pageProps.data.slice(pageProps.start, pageProps.end).map((rest: any, index: any) => (
                            <Grid item xs={12} sm={4} md={3} key={index}>
                                <RestaurantCard key={rest._id} _id={rest._id} name={rest.name} image={rest.image} booking={rest.booking} stars={rest.stars} region={rest.region} city={rest.city}></RestaurantCard>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='viewpage__content__pages'>
                    <Pagination onChange={handlePages} count={pageProps.totalPages} color="primary" style={{ marginBottom: "1rem" }} />
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default ViewPage