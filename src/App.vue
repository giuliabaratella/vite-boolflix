<template>
  <ErrorBanner v-if="store.error"/>
  <div v-else>
    <welcomeBanner v-if="store.welcome" @enterBoolflix="getPopularandRated"/>
    <div v-if="!store.welcome">
      <HeaderComponent @search="searchMovies"/>
      <MainComponent/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {store} from './assets/data/store';
import HeaderComponent from './components/HeaderComponent.vue';
import MainComponent from './components/MainComponent.vue';
import welcomeBanner from './components/welcomeBanner.vue';
import ErrorBanner from './components/ErrorBanner.vue';



  export default {
    components:{
      HeaderComponent,
      MainComponent,
      welcomeBanner,
      ErrorBanner,
    },
    data(){
      return{
          store,
      }
    },
    methods:{
      getMovies(){
        const movieUrl = this.store.urlApi + this.store.endpoint.movie;
        return axios.get(movieUrl, {params: this.store.params})
      },
      getSeries(){
        const seriesUrl = this.store.urlApi + this.store.endpoint.series;
        return axios.get(seriesUrl, {params: this.store.params})
      },
      getMoviesandSeries(){
        this.store.startSearch = false;
        this.store.showResults = false;
        this.store.loading = true;
        this.store.searchWarning = false;
        store.seriesList=[];
        store.moviesList=[];
        Promise.all([this.getMovies(), this.getSeries()]).then((resp)=> {
          this.store.moviesList = resp[0].data.results;
          this.store.seriesList = resp[1].data.results;
          console.log(store.moviesList);
          console.log(store.seriesList);
        }).catch((error)=>{
          console.log(error.response)
        this.store.error= error.message
        console.log(store.error)
      }).finally(()=>{
        store.loading = false;
        if (store.moviesList.length < 1 && store.seriesList.length < 1){
          this.store.searchWarning = true;
        }else {
          this.store.showResults = true;
        }
      })
      },
      searchMovies(val){
        console.log(val);
        if(val){
          this.store.params.query = val;
          this.getMoviesandSeries();
        }else{
          this.store.params.query = '';
          this.getMoviesandSeries();
        }
      },
      getPopular(){
        const popularUrl = this.store.urlApi + this.store.endpoint.popular;
        return axios.get(popularUrl, {params: this.store.params})
      },
      getRated(){
      const topRatedUrl = this.store.urlApi + this.store.endpoint.topRated;
      return axios.get(topRatedUrl, {params: this.store.params})
      },
      getPopularandRated(){
        this.store.welcome= false;
        this.store.loading= true;
        // console.log(store.loading);
        Promise.all([this.getPopular(), this.getRated()]).then((resp)=> {
          this.store.popularList = resp[0].data.results;
          this.store.topRatedList = resp[1].data.results;
        }).catch((error)=>{
          this.store.error= error;
        }).finally(()=>{
        store.loading = false;
        });
      },
      getMoviesGenres(){
        const moviesGenresUrl = this.store.urlApi + this.store.endpoint.moviesGenres;
        return axios.get(moviesGenresUrl, {params: this.store.params})
      },
      getSeriesGenres(){
        const seriesGenresUrl = this.store.urlApi + this.store.endpoint.seriesGenres;
        return axios.get(seriesGenresUrl, {params: this.store.params})
      },
      getGenres(){
        Promise.all([this.getMoviesGenres(), this.getSeriesGenres()]).then((resp)=> {
          this.store.moviesGenresList = resp[0].data.genres;
          this.store.seriesGenresList = resp[1].data.genres;
        }).catch((error)=>{
          this.store.error= error;
        })
      }
    },
    created(){
      this.getGenres();
    },
  }
</script>

<style lang="scss" scoped>

</style>