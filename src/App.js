import React from "react";
import { useState, useEffect } from "react";
import './app.css';
import SearchIcon from './search.svg';
import MovieCard from "./movieCard";

// 3350c3c9
const API_URL = "http://www.omdbapi.com?apikey=3350c3c9";

const movie1 = {
    "Title": "Superman, Spiderman or Batman",
    "Year": "2011",
    "imdbID": "tt2084949",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
} 

const App = () => {
    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`); // pull API data
        const data = await response.json();

        setMovies(data.Search);
    }
    
    useEffect(()=>{
        searchMovies('Good');
    }, []);

    return(
        <div className="app">
            <h1>MovieLVR</h1>    
            
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => {searchMovies(searchTerm)}}
                />
            </div>
            {movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}                        
                    </div>                    
                ):(
                    <div className="empty">
                        <h2>No movies found!</h2>
                    </div>
                )}
        </div>

    );
}

export default App;