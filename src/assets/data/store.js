import {reactive} from 'vue';
export const store= reactive ({
    urlApi: 'https://api.themoviedb.org/3',
    urlImg: 'https://image.tmdb.org/t/p/w500',
    endpoint: {
        movie: '/search/movie',
        series: '/search/tv',
    },
    params:{
    api_key: 'bd3bc1f46c81d86cf1ba39c68386e73e',
    query:'a',
    },
    moviesList:[],
    seriesList:[],
    
})