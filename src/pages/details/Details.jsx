import React from 'react'
import './style.scss'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import Cast from '../cast/Cast'
import VideosSection from '../../components/videosSection/VideosSection'
import Similar from './Carousels/Similar'
import Recommendation from './Carousels/Recommendation'
const Details = () => {
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)
    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            {/* only will be sending the first result */}
            <Cast data={credits?.cast} loading={creditsLoading}></Cast>
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details
