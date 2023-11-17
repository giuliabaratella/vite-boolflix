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
      getMoviesandSeries(){
        store.showResults = true;
        store.seriesList=[];
        store.moviesList=[];
        const movieUrl = this.store.urlApi + this.store.endpoint.movie;
        axios.get(movieUrl, {params: this.store.params}).then ((resp)=> {
          console.log(resp.data.results);
          this.store.moviesList = resp.data.results;
          if (store.moviesList.length < 1){
            this.store.searchMovies = false;
          }
        })
        const seriesUrl = this.store.urlApi + this.store.endpoint.series;
        axios.get(seriesUrl, {params: this.store.params}).then ((resp)=> {
          console.log(resp.data.results);
          this.store.seriesList = resp.data.results;
          if (store.seriesList.length < 1){
            this.store.searchSeries = false;
          }
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