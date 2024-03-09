import React, { useState, useEffect } from 'react'
import './style.scss'
import { HiOutlineSearch } from 'react-icons/hi'
import { SlMenu } from 'react-icons/sl'
import { VscChromeClose } from 'react-icons/vsc'
import { useNavigate, useLocation } from 'react-router-dom'

import logo from '../../assets/images/movix-logo.svg'
import ContentWrapper from '../contentWrapper/contentWrapper'
const Header = () => {
    // here below we are creating the required hooks
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false)
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    // apne location ko track karega
    const location = useLocation();

    useEffect(() => { window.scrollTo(0, 0) }, [location])

    // below function se jab bhi scolle karenge uske scroll ka number print hooga
    const controlNavbar = () => {
        // console.log(window.scrollY);
        if (window.scrollY > 200) {
            if (!mobileMenu && window.scrollY > lastScrollY) {
                setShow('hide')
            }
            else {
                setShow('show')
            }
        }
        else {
            setShow('top')
        }
        setLastScrollY(window.scrollY)
    }
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [lastScrollY])
    // jaise hi lastscrolly change hooga toh useffect chalega
    const openSearch = () => {
        setShowSearch(true)
        setMobileMenu(false)
    }
    const openMobileMenu = () => {
        setMobileMenu(true)
        setShowSearch(false)
    }

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }
    const navigationHandler = (type) => {
        if (type === 'movie') {
            navigate('/explore/movie');
            setMobileMenu(false);
        }
        else {
            navigate('/explore/tv');
            setMobileMenu(false);
        }
    }
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`} >
            <ContentWrapper>
                <div className="logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => {
                        navigationHandler('movie')
                    }}>Movies</li>
                    <li className="menuItem" onClick={() => {
                        navigationHandler('tv')
                    }}>TV shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
                </div>
            </ContentWrapper >
            {showSearch && (<div className="searchBar">
                <ContentWrapper>
                    <div className="searchInput">
                        <input type="text" onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} placeholder='Search for a movie or tv result...' />
                        <VscChromeClose onClick={() => setShowSearch(false)} />
                    </div>

                </ContentWrapper>
            </div>)}
        </header >
    )
}

export default Header
