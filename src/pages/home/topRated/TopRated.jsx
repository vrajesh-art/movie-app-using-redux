import React, { useState, useEffect } from 'react'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {


    //  /trending/{media_type}/{time_window}
    // above is the endpoint from the api it mediatype will be all means will get all categories and timewindow can be day week etc
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/top_rated`)
    // below we are creating the function for making an api call
    const onTabChange = (tab) => {

        setEndpoint(tab === 'Movies' ? 'movie' : 'tv')


    }
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Top Rated</span>
                <SwitchTabs data={['Movies', "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default TopRated

