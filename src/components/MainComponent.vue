<template>
    <main>
        <section class="container">
            <h2 class="text-uppercase">Movies</h2>
            <div class="row column-gap-4 align-items-stretch justify-content-center">
                <cardBox v-for="el in store.moviesList"
                :title="el.title" 
                :originalTitle="el.original_title" 
                :raiting="el.vote_average" 
                :language="el.original_language"
                :imgSource=" el.poster_path"/>

            </div>
        </section>

        <section class="container">
            <h2 class="text-uppercase">Series</h2>
            <div class="row column-gap-4 align-items-stretch justify-content-center">

                <cardBox v-for="el in store.seriesList"
                :title="el.name" 
                :originalTitle="el.original_name" 
                :raiting="el.vote_average" 
                :language="el.original_language"
                :imgSource=" el.poster_path"/>


            </div>
            
        </section>
    </main>
</template>

<script>
import { store } from '../assets/data/store';
import cardBox from './cardBox.vue';
    export default {
        name:'MainComponent',
        components:{
            cardBox,
        },
        data(){
            return{
                store,
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;
main {
    background-color: $colorMainBg;
    color: $colorLight;
    height: calc(100vh - 80px);
    overflow-y: auto;
    h2{
        color: $colorPrimary;
        margin-bottom: 30px;
    }
}

</style>