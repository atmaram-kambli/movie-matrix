/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.scss'

import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import Img from '../../../components/LazyLoading/Img'


const HeroBanner = () => {
  const [bgImage, setBgImage] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { url } = useSelector((state => state.home));
  const {data, loading} = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBgImage(bg);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  

  const searchQueryHandler = (e) => {
    if(e.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }


  return (
    <div className='heroBanner'>
    { !loading && <div className="backdrop-img">
      <Img src={bgImage} />
    </div> }
    <div className="opacity-layer"></div>
    <ContentWrapper>
      <div className="heroBannerContent">
        <span className="title">Welcome</span>
        <span className="subTitle">Millions of movies, TV shows and people to discover.
        Explore now.</span>
        <div className="searchInput">
          <input type="text" placeholder='Search for a movie or tv show...' onChange={(e) => {setQuery(e.target.value)}} onKeyUp={searchQueryHandler} />
          <button>Search</button>
        </div>
      </div>
    </ContentWrapper>
    </div>
  )
}

export default HeroBanner