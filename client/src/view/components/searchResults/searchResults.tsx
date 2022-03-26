import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './searchResults.scss'

interface LocationState {
    prop: string;
}
export const SearchResults = () => {
    const { SearchString } = useParams()
    const location = useLocation()
    let { prop } = location.state as LocationState;
    if (prop == null)
        prop = "restaurant"

    return (<div>

    </div>)
}