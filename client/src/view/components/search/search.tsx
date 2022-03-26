import React, { useState } from 'react'
import './search.scss'
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [searchProp, setSearchProp] = useState('restaurant')
    const [searchvalue, setSearchvalue] = useState('')
    const navigate = useNavigate()
    function handleSearchProp(e: any) {
        setSearchProp(e.target.value)
    }
    function handleInput(e: any) {
        setSearchvalue(e.target.value)
    }
    function handleSearch(e: any) {
        e.preventDefault()
        navigate(`/search/${searchvalue}`, { state: { "prop": searchProp } })

    }
    return (
        <div className="searchDiv">
            <div className="searchDiv__bar">
                <h1 className="searchDiv__title">Find Your Table</h1>
                <div className="searchDiv__bar__content">
                    <form onSubmit={handleSearch}>
                        <div className="searchDiv__bar__content__a">
                            <input required className="searchDiv__bar__content__a__input" type="text" placeholder=" Search For Food or Restaurant" name="search" onChange={handleInput} />
                            <FormControl variant="filled" sx={{ backgroundColor: "white", minWidth: 120, maxHeight: '2.5rem', zIndex: 0 }}>
                                <InputLabel style={{ fontSize: '0.7rem' }} id="demo-simple-select-filled-label">Category</InputLabel>
                                <Select MenuProps={{ disableScrollLock: true }} sx={{ height: "2.5rem", backgroundColor: "white" }}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={searchProp}
                                    onChange={handleSearchProp}
                                >
                                    <MenuItem value={'restaurant'}>Restaurant</MenuItem>
                                    <MenuItem value={'food'}>Food</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="searchDiv__bar__content__b">
                            <button className="searchDiv__bar__content__b__btn" name="submit"> Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );

}

export default Search;