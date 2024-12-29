import'../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext'

function MovieCard({movie}){

    const {isFavorite, addFavorite, removeFavorite} = useMovieContext()
    const isFav = isFavorite(movie.id)

    function onFavoriteClick(e){
        e.preventDefault()
        if(isFav){
            removeFavorite(movie.id)
        }else{
            addFavorite(movie)
        }
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${isFav ? 'active' : ''}`} onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard