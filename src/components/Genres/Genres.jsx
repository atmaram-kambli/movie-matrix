/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from "react-redux";

import './style.scss'


const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);
  return (
    <div className='genres'>
        {
            data?.map((gen) => {
                if(!genres[gen]?.name) return;
                return (
                    <div key={gen} className="genre">
                        {genres[gen]?.name}
                    </div>
                )
            })
        }
    </div>
  )
}

export default Genres