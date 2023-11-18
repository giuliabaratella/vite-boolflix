<template>
  <welcomeBanner v-if="store.welcome"/>
  <div v-if="!store.welcome">
    <HeaderComponent @search="searchMovies"/>
    <MainComponent/>
  </div>
</template>

<script>
import axios from 'axios';
import {store} from './assets/data/store';
import HeaderComponent from './components/HeaderComponent.vue';
import MainComponent from './components/MainComponent.vue';
import welcomeBanner from './components/welcomeBanner.vue';


  export default {
    components:{
      HeaderComponent,
      MainComponent,
      welcomeBanner,
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
        this.store.showResults = false;
        this.store.loading = true;
        this.store.searchWarning = false;
        store.seriesList=[];
        store.moviesList=[];
        Promise.all([this.getMovies(), this.getSeries()]).then((resp)=> {
          this.store.moviesList = resp[0].data.results;
          this.store.seriesList = resp[1].data.results;
        }).catch((error)=>{
        this.store.error= error.message
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
      }
    },
    created(){
    },
  }
</script>

<style lang="scss" scoped>

</style>