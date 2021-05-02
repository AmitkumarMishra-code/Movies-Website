import { useState, useEffect } from 'react'
import MovieTiles from './MovieTiles'
export default function Home() {
    let [movies, setMovies] = useState([])
    let [list, setList] = useState('popular')

    async function getData() {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${list}?api_key=18ef1e80a5a1e2408235db52406c9927&language=en-US&page=1`)
        let data = await response.json()
        console.log(data)
        setMovies(data.results)
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [list])

    function changeList(e) {
        setList(e.target.classList[0])
    }

    return (
        <div className='container'>
            <div className="navbar"><ul>Movies
            <li className='popular' onClick={changeList}>Popular</li>
                <li className='now_playing' onClick={changeList}>Now Playing</li>
                <li className='upcoming' onClick={changeList}>Upcoming</li>
                <li className='top_rated' onClick={changeList}>Top-rated</li>
            </ul></div>
            {!movies.length && (
                <div className="loading-message"><h1>Loading...</h1></div>
            )}
            {
                movies.length && (
                    <div className='results-display'>
                        {movies.map(movie => <MovieTiles value={movie} />)}
                    </div>
                )
            }
        </div>
    )
}