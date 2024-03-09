import React, { useEffect } from 'react'
import './style.scss'
import HeroBanner from './herobanner/HeroBanner.jsx'
import Footer from '../../components/footer/Footer.jsx'
import Trending from './trending/Trending.jsx'
import { useLocation } from 'react-router-dom'
import Popular from './popular/Popular.jsx'
import TopRated from './topRated/TopRated.jsx'
const Home = () => {
    const location = useLocation();
    // useEffect(() => { window.scrollTo(0, 0) }, [location])
    return (
        <div className='Homepage'>
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />
            {/* <div style={{ height: '200px ' }}></div> */}

        </div >
    )
}

export default Home
