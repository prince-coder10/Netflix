import React, { useState, useEffect } from 'react';
import axios from './axios' ;

const Row = ({ title, fetchUrl }) => {
    const [movies, setMovies] = useState([]);

//a snippet of code wich runs on a specific cindition or value
useEffect(() => {
    // if the bracket is blank it will run once when the row loads and dint run again
    async function fetchData() {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results)
        return request;
    }
    fetchData();
    }, [])

  return (
    <div>
        <h2>{ title }</h2>
    </div>
  )
}

export default Row
