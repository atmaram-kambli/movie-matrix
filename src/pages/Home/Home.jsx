import React from 'react'
import './style.scss'
import HeroBanner from './HeroBanner/HeroBanner'
import Trending from './Trending/Trending'


const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending />
      <div style={{height:"500px"}}></div>
    </div>
  )
}

export default Home