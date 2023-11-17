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
        return axios.get(movieUrl, {params: this.store.params})
      },
      getSeries(){
        const seriesUrl = this.store.urlApi + this.store.endpoint.series;
        return axios.get(seriesUrl, {params: this.store.params})
      },
      getMoviesandSeries(){
        store.showResults = true;
        store.seriesList=[];
        store.moviesList=[];
        Promise.all([this.getMovies(), this.getSeries()]).then((resp)=> {
          this.store.moviesList = resp[0].data.results;
          this.store.seriesList = resp[1].data.results;

          if (store.moviesList.length < 1){
            this.store.searchMovies = false;
          };
          if (store.seriesList.length < 1){
            this.store.searchSeries = false;
          };
        }).catch((error)=>{
        this.store.error= error.message
      }).finally(()=>store.loading = false)
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
      }
    },
    created(){
    },
  }
</script>

<style lang="scss" scoped>

</style>