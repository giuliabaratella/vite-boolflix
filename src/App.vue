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
        store.seriesList=[];
        store.moviesList=[];
        const movieUrl = store.urlApi + store.endpoint.movie;
        axios.get(movieUrl, {params: store.params}).then ((resp)=> {
          console.log(resp.data.results);

          store.moviesList = resp.data.results;
        })
        const seriesUrl = store.urlApi + store.endpoint.series;
        axios.get(seriesUrl, {params: store.params}).then ((resp)=> {
          console.log(resp.data.results);
          store.seriesList = resp.data.results;
        })
        console.log(store.moviesList);
        console.log(store.seriesList);
      },
      searchMovies(val){
        console.log(val);
        if(val){
          store.params.query = val;
        }else{
          store.params.query = '';
        }
        this.getMoviesandSeries();
        

      }
    },
    created(){
      // this.getMoviesandSeries();
    },
  }
</script>

<style lang="scss" scoped>

</style>