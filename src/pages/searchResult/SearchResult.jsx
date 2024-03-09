import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import './style.scss'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/contentWrapper'
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/movieCard/MovieCard'
const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    // basically starting mein hume 20 results milte hai and hume usse extra load karayenge sending page numbers
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
            console.log('search result is ', res)
            setData(res)
            setPageNum((prev) => prev + 1)
            setLoading(false)
        })
    }


    // now as we know that the new page data will be loaded we have tp merge the data with the prvious data
    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
            if (data.results) {
                setData({
                    ...data, results: [...data.results, ...res.results]
                })
            }
            else {
                setData(res)
            }
            setPageNum((prev) => prev + 1)
        })
    }
    useEffect(() => {
        setPageNum(1)
        fetchInitialData()
    }, [query])
    // anytime te query chnages the useeffect method will be working
    return (
        <h1 className='searchResultsPage'>
            {
                loading && <Spinner initial={true} />
            }
            {
                !loading && (
                    <ContentWrapper>
                        {data?.results.length > 0 ? (<>
                            <div className="pageTitle">
                                {`Search ${data?.total_results > 1 ? "results" : 'result'} of '${query}'`}
                            </div>
                            <InfiniteScroll className='content' dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={<Spinner />}>
                                {
                                    data.results.map((item, index) => {
                                        if (item.media_type === "person") {
                                            return;
                                        }
                                        return (
                                            <MovieCard key={index} data={item} fromSearch={true} />
                                        )
                                    })
                                }
                            </InfiniteScroll>
                        </>) : (
                            <span className="resultNotFound">
                                Sorry, Results not found
                            </span>
                        )}
                    </ContentWrapper>
                )
            }
        </h1 >
    )
}

export default SearchResult
