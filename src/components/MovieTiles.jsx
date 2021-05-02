import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MovieTiles(props) {
    let [display, setDisplay] = useState('none')
    let [transition, setTransition] = useState('none')
    let [bottom, setBottom] = useState('-1000px')
    let path = 'https://image.tmdb.org/t/p/w500/'


    // console.log(props.value)
    let displayFloatingInfo = () => {
        setDisplay('flex')
        setTransition('all 50ms ease-in')
        setBottom('0px')
    }
    let hideFloatingInfo = () => {
        setDisplay('none')
        setTransition('bottom 50ms ease-out')
        setBottom('-1000px')
    }

    return (
        <Link to={`/movie/${props.value.id}`}>
            <div className='movie-tiles' onMouseOver={displayFloatingInfo} onMouseOut={hideFloatingInfo}>
                <img src={path + props.value.poster_path} alt="" />
                <div className="floating-details" style={{ transition: transition, bottom: bottom, display: display }}>
                    <div className="title"><strong>{props.value.title}</strong></div>
                    <hr />
                    <div className="info">
                        <div className="synopsis">{props.value.overview}</div>
                        <div className="rating">{props.value.vote_average.toFixed(1)}</div>
                    </div>
                </div>
                <div className="percentage" style={{ display: display }}>{props.value.vote_average * 10}%</div>
            </div>
        </Link>
    )
}