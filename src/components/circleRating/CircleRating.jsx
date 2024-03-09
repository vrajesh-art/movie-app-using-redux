import React from 'react'
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import './style.scss'
const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar value={rating} maxValue={10} text={rating} styles={buildStyles({
                pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
            })} />

        </div>
    )
}

// max value 10 diya hai because else value 100 mein se count hoota hai

export default CircleRating
