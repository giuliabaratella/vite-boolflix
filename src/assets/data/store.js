import {reactive} from 'vue';
export const store= reactive ({
    urlApi: 'https://api.themoviedb.org/3',
    urlImg: 'https://image.tmdb.org/t/p/',
    
    imgSize:{
        poster: 'w342',
        backdrop: 'w780',
    },
    endpoint: {
        movie: '/search/movie',
        series: '/search/tv',
        popular: '/movie/popular',
        topRated: '/movie/top_rated',
        moviesGenres:'/genre/movie/list',
        seriesGenres:'/genre/tv/list'
    },
    params:{
    api_key: 'bd3bc1f46c81d86cf1ba39c68386e73e',
    query:'',
    language:'it-IT',
    include_adult: false,
    },
    moviesList:[],
    seriesList:[],
    showResults: false,
    startSearch: false,
    searchWarning:false,
    error:'',
    loading: false,
    welcome: true,
    popularList:[],
    topRatedList:[],
    moviesGenresList:[],
    seriesGenresList:[],
})