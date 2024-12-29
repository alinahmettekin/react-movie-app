import { useState, useEffect} from "react"
import { getPopularMovies, searchMovies } from "../services/api"
import MovieCard from "../components/MovieCard"
import '../css/Home.css'


function Home(){

    const [searchQuery, setSearchQuery] = useState("")  

    const [movies, setMovies] = useState([])

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (error) {
                console.log(error)
                setError('Failed to load movies')
            } finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if(loading) return
        setLoading(true)

        try {
           const searchResult = await searchMovies(searchQuery) 
           setMovies(searchResult)
           setError(null)
        } catch (error) {
            setError('Failed to search movies')
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    className="search-input"
                    type="text" 
                    placeholder="Search for a movie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <div>{error}</div>}
            {loading 
                ? <div>LOADING</div> 
                : <div className="movies-grid"> 
                    {movies.map(movie => (<MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>}
            
        </div>
    )
}

export default Home