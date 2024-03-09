import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
// dayjs is used for changing the format of the date received from the server
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/img";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/images/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import './style.scss'
import '../../index.scss'

// import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres"; 
const Carousel = ({ data, loading, endpoint, title }) => {

    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate()


    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }
    const navigation = (dir) => {
        const container = carouselContainer.current;
        // will be using the property of element scrollleft 
        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) :
            container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }
    // console.log(carouselContainer.current)


    return (
        <div className="carousel">
            {/* kisi bhi div ko pakadne ke liye apan useref ka use karte hai */}
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigation("right")} />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                            return (
                                <div className="carouselItem" key={item.id} onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {
                                                item.title || item.name
                                            }
                                        </span>
                                        <span className="date">
                                            {
                                                dayjs(item.release_Date).format("MMM D, YYYY")
                                            }
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}

                    </div>
                )}
            </ContentWrapper>
        </div >
    )
}

export default Carousel
