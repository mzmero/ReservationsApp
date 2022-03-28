import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/menu/menu'
import SearchIcon from '@mui/icons-material/Search';
import './searchPage.scss'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllRestaurants, fetchAllRestaurants } from '../../../app/reducers/resterauntsReducer';


function SearchPage() {
    const [searchProp, setSearchProp] = useState('restaurant')
    const [searchvalue, setSearchvalue] = useState('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const arrOfRestaurants = useAppSelector(getAllRestaurants)
    useEffect(() => {
        if (arrOfRestaurants.length == 0)
            dispatch(fetchAllRestaurants())
    }, [])
    function handleInput(e: any) {
        setSearchvalue(e.target.value)
    }

    function handleSearch(e: any) {
        e.preventDefault()
        navigate(`/search/${searchvalue}`, { state: { "prop": searchProp } })
    }
    return (
        <div className="searchpage">
            <NavBar></NavBar>
            <div className="searchpage__content">
                <div className="searchpage__content__search">
                    <div className="searchpage__content__search__title">
                        <h1>How can we help?</h1>
                    </div>
                    <form onSubmit={handleSearch}>
                        <div className="searchpage__content__search__bar" >
                            <TextField required fullWidth id="standard-basic" variant="standard" sx={{ backgroundColor: "white", Height: "2.5rem", maxWidth: "20rem" }} InputProps={{
                                startAdornment: <SearchIcon />,
                                disableUnderline: true,
                                sx: { height: "2.5rem" }
                            }} onChange={handleInput} />
                            <FormControl fullWidth sx={{ backgroundColor: "white", maxWidth: "7rem" }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={searchProp}
                                    label="Category"
                                    onChange={(e: any) => { setSearchProp(e.target.value) }}
                                    size='small'
                                >
                                    <MenuItem value={'restaurant'}>Restaurant</MenuItem>
                                    <MenuItem value={'food'}>Food</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Button fullWidth size="small" variant="contained" sx={{ height: "2.5rem", maxWidth: "27rem" }} type="submit">Search</Button>
                    </form>

                </div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default SearchPage