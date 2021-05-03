import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import Genre from './Genre'
import OTT from './OTT'

export default function Selected(props) {
    // let params = useParams()
    let [loading, setLoading] = useState(true)
    let [movieData, setMovieData] = useState({})
    let [trailer, setTrailer] = useState("https://www.youtube.com/")
    let [review, setReview] = useState('Review')
    let [message, setMessage] = useState('click to expand')
    let [ottUS, setOttUS] = useState([])
    let path = 'https://image.tmdb.org/t/p/'
    // console.log(params)
    // console.log(this.params)

    async function getMovieData() {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=18ef1e80a5a1e2408235db52406c9927&language=en-US&append_to_response=videos,reviews,watch/providers`)
        let data = await response.json()
        setMovieData(data)
        console.log(data)
        getTrailer(data)
        getOTTProviders(data['watch/providers'].results)
        setLoading(false)
    }

    function getOTTProviders(ottProviders) {
        if ('US' in ottProviders) {
            if ('buy' in ottProviders['US']) {
                setOttUS(ottProviders['US'].buy.map(provider => [provider.logo_path, provider.provider_name]))
            }
            else if ('flatrate' in ottProviders['US']){
                setOttUS(ottProviders['US'].flatrate.map(provider => [provider.logo_path, provider.provider_name]))
            }
            else{
                setOttUS(ottProviders['US'].rent.map(provider => [provider.logo_path, provider.provider_name]))
            }
        }
    }

    function getTrailer(data) {
        let trailer = data.videos.results.find(video => video.type === 'Trailer')
        if (trailer !== undefined) {
            setTrailer('https://www.youtube.com/watch?v=' + trailer.key)
        }
    }

    function expandReview() {
        if (review === 'Review') {
            getRandomReview(movieData.reviews.results)
        }
        else {
            setReview('Review')
            setMessage('click to expand')
        }
    }

    function getRandomReview(reviews) {
        if (reviews.length) {
            let selectedReview = getRandomNumber(reviews.length)
            let review = reviews[selectedReview].content
            let rating = reviews[selectedReview].author_details.rating
            let text = `Rating: ${rating ? rating + '/10' : 'N/A'}\n\nReview: ${review}`
            setReview(text)
        }
        else {
            setReview('No reviews found')
        }
        setMessage('click to collapse')
    }

    function getRandomNumber(range) {
        return Math.floor(Math.random() * range)
    }

    useEffect(() => {
        getMovieData()
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
            {loading && (<div className="loading-message"><h1>Loading...</h1></div>)}
            {!loading && (
                <div className='focused-movie' style={{ backgroundImage: `url(${path + 'w1280' + movieData.backdrop_path})` }}>
                    <div className="transparent-layer">
                        <div className="movie">
                            <img className="movie-poster" src={path + 'w500' + movieData.poster_path} alt='' />
                            <div className="movie-details">
                                <div className="movie-title"><strong>{movieData.title}</strong></div>
                                <div className="tagline"><em>{movieData.tagline}</em></div>
                                <div className="movie-synopsis">{movieData.overview}</div>
                                <div className="genres">{movieData.genres.map((genre, index) => <Genre value={genre.name} key={index} />)}</div>
                                <div className="trailer-link"><a target="_blank" rel="noreferrer" href={trailer} className='watch-trailer'><strong>Watch Trailer</strong><img src="/play.png" alt="" /></a></div>
                                <div className="review" title={message} onClick={expandReview}>{review}</div>
                            </div>
                        </div>
                        <div className="ott">{ottUS.map((provider, index) => <OTT logo={path + 'w500' + provider[0]} title={provider[1]} key={index} />)}</div>
                    </div>
                </div>
            )}
        </div>
    )
}