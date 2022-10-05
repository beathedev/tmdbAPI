import axios from "axios";

// Base da URL: https://api.themoviedb.org/3/
// URL DA API: movie/550?api_key=f3cfddbd740c74cb1f5dff19175b8b92

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;