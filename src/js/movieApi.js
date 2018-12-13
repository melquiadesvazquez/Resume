export class MovieApi {

    constructor () {
        // Data imported from https://api.themoviedb.org/3/discover/movie?with_genres=878&sort_by=popularity.desc
        this.apiUrl = '../json/movies.json'
    }

    // Simulates an AJAX call to the API, but using a local json file
    getSciFiMovies() {
        return fetch('../json/movies.json')
        .then(response => {
            if (response.ok) {
                return response.json()
            } 
            else {
                return new Promise((resolve, reject) => {
                    resolve('Connection error', response.status)
                })
            }
        })
        .then(response => response)
    }
}