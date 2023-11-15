<template>
  <section id="movies"></section>
  <section id="series"></section>

</template>

<script>
import axios from 'axios';
import {store} from './assets/data/store'
  export default {
    data(){
      return{
          store,
      }
    },
    methods:{
      getMoviesandSeries(){
        const movieUrl = store.urlApi + store.endpoint.movie;
        axios.get(movieUrl, {params: this.store.params}).then ((resp)=> {
          store.moviesList = resp.data.results;
        })
        const seriesUrl = store.urlApi + store.endpoint.series;
        axios.get(seriesUrl, {params: this.store.params}).then ((resp)=> {
          store.seriesList = resp.data.results;
        })
        console.log(store.moviesList);
        console.log(store.seriesList);
      },
    },
    created(){
      this.getMoviesandSeries();
    },
  }
</script>

<style lang="scss" scoped>

</style>