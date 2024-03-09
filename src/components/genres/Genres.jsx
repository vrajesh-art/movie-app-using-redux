import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
const Genres = ({ data }) => {
    // destructure karne se humko sirf state.home se genres milega
    const { genres } = useSelector((state) => state.home)
    // console.log('reux data is', genres)
    return (
        <div className="genres">
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres
