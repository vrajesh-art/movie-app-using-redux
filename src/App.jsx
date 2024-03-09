import { useState, useEffect } from 'react'
import { fetchDataFromApi } from './utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Explore from './pages/explore/explore'
import Home from './pages/home/home'
import PageNotFound from './pages/404/PageNotFound'
import Details from './pages/details/details'
import Header from './components/header/header'
import SearchResult from './pages/searchResult/searchResult'
import Footer from './components/footer/Footer'
// value joh bhi store huve hai unko use karne ke liye apan useselector ka use karte hai

// below we are importing the necessary files


function App() {
  const dispatch = useDispatch()
  // state ke andhar saari state aa jaati hai url genre hoogaya apan apne marzi ke hisaab se usko use kar sakte hai
  // url mein apan ne state.url ko fetxh karwa diya
  const { url } = useSelector((state) => state.home)
  console.log(url)

  // using the useeffect hook for function call at the initial time
  // useEffect(() => {
  //   apitesting()
  // }, [])
  // // below we have created the function for testing the api 
  // const apitesting = () => {
  //   fetchDataFromApi("/movie/popular").then((res) => {
  //     console.log(res);
  //     // below mein hume joh bhi response mil rh hai woh hyumne send kardiya joh ki url object mein save hoo jaayega
  //     dispatch(getApiConfiguration(res))
  //   })
  // } 
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])
  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      console.log(res)
      // hum saare res ko store mein save nhi karayenge ek url banayenge and usko save karayenge
      // dispatch(getApiConfiguration(res))
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      }
      // this original get attach with the url and represents the size
      // hume isse hamare action mein pass karana means dispatch karana hai action se taaki yeh store mein save hoo sake
      dispatch(getApiConfiguration(url))
    })
  }


  // below we are making the function for the genre call
  const genresCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let allGenres = {};


    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })


    const data = await Promise.all(promises);
    console.log('genres=>', data)
    // will get the object containing the two response

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })

    // console.log('final data', allGenres)
    dispatch(getGenres(allGenres))
  }
  return (

    // <div className='App'>
    //   <h1>{url?.total_pages}</h1>
    // </div>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>

  )
}

export default App
