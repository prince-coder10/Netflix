import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain",
  },
};

// base url to make requests to the movie database

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  https: config,
});

export default instance;