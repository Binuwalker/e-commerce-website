import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Layout.css';
import {BsSearch} from 'react-icons/bs';

const Search = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState("")

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}`)
    }

    const clearKeyword = () => {
        setKeyword("")
    }

    useEffect(() => {
        if (location.pathname !== `/`) {
            clearKeyword();
        }
    }, [location])

    return (
        <form onSubmit={searchHandler} className="nav-search-container">
            <div className='nav-search'>
                <div className='nav-search-input-container'>
                    <input
                        className="nav-search-input"
                        type="text"
                        id="search_field"
                        placeholder="Search For Games"
                        aria-label="Search"
                        onChange={(e) => { setKeyword(e.target.value) }}
                        value={keyword}
                    />
                </div>
                <div className='nav-search-btn-container'>
                    <button class="nav-search-btn" id="search_btn" type="submit"><BsSearch /></button>
                </div>
            </div>
        </form>
    )
}

export default Search;