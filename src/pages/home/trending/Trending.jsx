import React, { useState, useEffect } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {


    //  /trending/{media_type}/{time_window}
    // above is the endpoint from the api it mediatype will be all means will get all categories and timewindow can be day week etc
    const [endpoint, setEndpoint] = useState("day");
    const { data, loading } = useFetch(`/trending/all/${endpoint}`)
    // below we are creating the function for making an api call
    const onTabChange = (tab) => {

        setEndpoint(tab === 'Day' ? 'day' : 'week')


    }
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Trending</span>
                <SwitchTabs data={['Day', "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending
