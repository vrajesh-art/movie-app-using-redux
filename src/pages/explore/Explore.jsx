import React, { useState, useEffect } from "react";

import './style.scss'
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from '../../components/contentWrapper/contentWrapper';
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";


let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];
const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false)

        })
    }

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then((res) => {
            if (data?.results) {
                setData({
                    ...data, results: [...data.results, ...res.results]
                })
            }
            else {
                setData(res);
            }

            setPageNum((prev) => prev + 1);
        })
    }

    // as soon as we get the new mediaType we have to take filters and all the other state to their initial conditions and call the fetchInitialFunction
    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);



    const onChange = (selectedItems, action) => {
        // console.log('action is', action)
        // console.log('selectedItems', selectedItems)

        if (action.name === 'genres') {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                // console.log(selectedItems)
                let genreId = selectedItems.map((g) => g.id)
                // we always get an array when we map the object and we have stored it in genreId
                // console.log(typeof (selectedItems))
                console.log('genre id is', genreId);
                // genreId = JSON.stringify(genreId);
                // console.log(genreId);
                // console.log(typeof (genreId))
                // we have converted the array to string now we dont need brackets hence will use slice
                genreId = JSON.stringify(genreId).slice(1, -1);
                // console.log(genreId);
                // console.log(filters)
                // initially the filter is empty will create the key called with_genres and store genreid into it
                filters.with_genres = genreId;
                // console.log(filters)


            }
            else {
                delete filters.with_genres

                // on crossmark in select the action goes as clear hence will delete the with_genres and make filter empty
                // console.log('deleted', filters)
            }
        }

        if (action.name === 'sortby') {
            setSortby(selectedItems)
            // console.log('sortby selected item is ', selectedItems)
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                // if the action.action is clear will delete teh sortby from filters
                // objects are always in key value pair
                delete filters.sort_by;
            }
        }
        // console.log(filters)
        // filters is an object

        // after selected one select option or both we have to call the initialfetch function and set the page num to 1
        setPageNum(1);
        fetchInitialData()

    }

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv" ? "Explore Tv Shows" : "Explore Movies"}
                    </div>
                    <div className="filters">
                        {/* we are using the react component select imported from react-select */}
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            // closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        >

                        </Select>
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        >
                        </Select>
                    </div>
                </div>


                {
                    loading && <Spinner initial={true} />
                }
                {
                    !loading && (
                        <>
                            {data?.results?.length > 0 ? (<InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {
                                    data?.results?.map((item, index) => {
                                        if (item.mediaType === "person") {
                                            return;
                                        }
                                        return (
                                            <MovieCard key={index} data={item} mediaType={mediaType} />
                                        )
                                    })
                                }
                            </InfiniteScroll>) : (
                                <span className="resultNotFound">Sorry,Results Not Found</span>
                            )}
                        </>
                    )
                }
            </ContentWrapper >
        </div >
    )
}

export default Explore
