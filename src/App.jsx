/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { fetchDataFromAPI } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './reduxStore/homeSlice'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import Explore from './pages/Explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import SearchResult from './pages/SearchResult/SearchResult'


function App() {
  const { url } = useSelector((state) => state.home)
  const dispatch = useDispatch()
  // console.log(url)
  
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromAPI('/configuration')
    .then((res) => {
      // console.log(res);
      const urlBg = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }

      dispatch(getApiConfiguration(urlBg))
    })
    .catch(err => {
      console.log(err)
    });
  }

    const genresCall = async () => {
      let promises = [];
      let endPoint = ["tv", "movie"];
      let allGenres = {};
      endPoint.forEach((url) => {
        promises.push(fetchDataFromAPI(`/genre/${url}/list`))
      })

      const data = await Promise.all(promises);
      // console.log(data)
      data?.map(({ genres }) => {
        // console.log(genres)
        return (genres.map((item) => {
          allGenres[item.id] = item
        }))
      })
      // console.log(allGenres)
      dispatch(getGenres(allGenres));
    }



  return (
    <>
      <BrowserRouter >
        <Header />
        <Routes >
          <Route path='/' element={ <Home />} />
          <Route path='/:mediaType/:id' element={ <Details />} />
          <Route path='/search/:query' element={ <SearchResult />} />
          <Route path='/explore/:mediaType' element={ <Explore />} />
          <Route path='*' element={ <PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
