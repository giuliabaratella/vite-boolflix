<template>
<HeaderComponent @search="searchMovies"/>
<MainComponent/>
</template>

<script>
import axios from 'axios';
import {store} from './assets/data/store';
import HeaderComponent from './components/HeaderComponent.vue';
import MainComponent from './components/MainComponent.vue';

  export default {
    components:{
      HeaderComponent,
      MainComponent,
    },
    data(){
      return{
          store,
      }
    },
    methods:{
      getMovies(){
        const movieUrl = this.store.urlApi + this.store.endpoint.movie;
        axios.get(movieUrl, {params: this.store.params})
      },
      getSeries(){
        const seriesUrl = this.store.urlApi + this.store.endpoint.series;
        axios.get(seriesUrl, {params: this.store.params})
      },
      getMoviesandSeries(){
        store.showResults = true;
        store.seriesList=[];
        store.moviesList=[];
        Promise.all([this.getMovies(), this.getSeries()]).then((resp)=> {
          console.log(resp[0].data.results);

          this.store.moviesList = resp[0].data.results;
          this.store.seriesList = resp[1].data.results;

          if (store.moviesList.length < 1){
            this.store.searchMovies = false;
          }else if (store.seriesList.length < 1){
            this.store.searchSeries = false;
          };
        })

       
      },
      searchMovies(val){
        console.log(val);
        store.searchMovies = true;
        store.searchSeries = true;
        if(val){
          this.store.params.query = val;
          this.getMoviesandSeries();
        }else{
          this.store.params.query = '';
          this.getMoviesandSeries();
          this.store.showResults = false;
        }
        console.log(store.searchResults)
      }
    },
    created(){
    },
  }
</script>

<style lang="scss" scoped>

</style>