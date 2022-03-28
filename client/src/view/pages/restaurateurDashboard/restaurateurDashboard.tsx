import './restaurateurDashboard.scss'
import React from 'react'
import { useParams } from 'react-router-dom'
import BarChart from '../../components/charts/bar'
import { getOwnerReserveData } from '../../../app/reducers/restaurantsReducer'
import { useAppSelector } from '../../../app/hooks'

function RestaurateurDashboard() {
    const allReservations = useAppSelector(getOwnerReserveData)
    const { RestaurantId, RestaurantName } = useParams()
    const reservatonsInRest = allReservations.filter((a) => {
        if (a.restId == RestaurantId)
            return a
    })
    const nextMonthMap = new Map<string, number>();
    const nextMonthDate = new Date();
    for (let i = 0; i < 31; i++) {
        const dateToString = 'y/m/d'.replace("d", "" + (nextMonthDate.getDate())).replace("m", "" + (nextMonthDate.getMonth() + 1)).replace("y", "" + nextMonthDate.getFullYear())
        nextMonthMap.set(dateToString, 0)
        nextMonthDate.setDate(nextMonthDate.getDate() + 1)
    }
    const prevMonthMap = new Map<string, number>();
    const prevMonthDate = new Date();
    prevMonthDate.setDate(prevMonthDate.getDate() - 30)
    for (let i = 0; i < 30; i++) {
        const dateToString = 'y/m/d'.replace("d", "" + (prevMonthDate.getDate())).replace("m", "" + (prevMonthDate.getMonth() + 1)).replace("y", "" + prevMonthDate.getFullYear())
        prevMonthMap.set(dateToString, 0)
        prevMonthDate.setDate(prevMonthDate.getDate() + 1)
    }
    reservatonsInRest.forEach((e) => {
        const date = new Date(e.date);
        const dateToString = 'y/m/d'.replace("d", "" + (date.getDate())).replace("m", "" + (date.getMonth() + 1)).replace("y", "" + date.getFullYear())
        const currentDate = new Date()
        const currDateToString = 'y/m/d'.replace("d", "" + (currentDate.getDate())).replace("m", "" + (currentDate.getMonth() + 1)).replace("y", "" + currentDate.getFullYear())
        if (dateToString.localeCompare(currDateToString) == -1) {
            const counter = prevMonthMap.get(dateToString)
            if (counter != undefined)
                prevMonthMap.set(dateToString, (1 + counter))
        }
        else {
            const counter = nextMonthMap.get(dateToString)
            if (counter != undefined)
                nextMonthMap.set(dateToString, (1 + counter))
        }
    })
    const nextMonthKeys = Array.from(nextMonthMap.keys());
    const nextMonthData = nextMonthKeys.map((a) => {
        return nextMonthMap.get(a);
    })
    const prevMonthKeys = Array.from(prevMonthMap.keys());
    const prevMonthData = prevMonthKeys.map((a) => {
        return prevMonthMap.get(a);
    })
    return (<div className='reservationsDashboards'>
        <h2>{RestaurantName}</h2>
        <div className='reservationsDashboards__high'>
            <BarChart labels={nextMonthKeys} data={nextMonthData} title={"Next Month"}></BarChart>
            <BarChart labels={prevMonthKeys} data={prevMonthData} title={"Previous Month"}></BarChart>
        </div>
        <div className='reservationsDashboards__low'>
            <BarChart labels={nextMonthKeys.slice(0, 7)} data={nextMonthData.slice(0, 7)} title={"Next Week"}></BarChart>
            <BarChart labels={prevMonthKeys.slice(-7)} data={prevMonthData.slice(-7)} title={"Previous Week"}></BarChart>
        </div>
    </div>)
}

export default RestaurateurDashboard