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
        const movieUrl = this.store.urlApi + this.store.endpoint.movie;
        axios.get(movieUrl, {params: this.store.params}).then ((resp)=> {
          console.log(resp.data.results);
          this.store.moviesList = resp.data.results;
          // console.log(this.store.moviesList);
        })
        const seriesUrl = this.store.urlApi + this.store.endpoint.series;
        axios.get(seriesUrl, {params: this.store.params}).then ((resp)=> {
          console.log(resp.data.results);
          this.store.seriesList = resp.data.results;
          // console.log(this.store.seriesList);
        })
      },
      searchMovies(val){
        console.log(val);
        if(val){
          this.store.params.query = val;
          this.getMoviesandSeries();
        }else{
          this.store.params.query = '';
        }
        

      }
    },
    created(){
      // this.getMoviesandSeries();
    },
  }
</script>

<style lang="scss" scoped>

</style>