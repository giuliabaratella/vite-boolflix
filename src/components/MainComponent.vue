<template>
    <main>
        <section class="container">
            <h2 class="text-uppercase">Movies</h2>
            <div class="row column-gap-2">
                <div class="col-2 mb-3" v-for="el in store.moviesList">
                    <div>{{ el.title }}</div>
                    <div>{{ el.original_title }}</div>
                    <div>{{ el.vote_average }}</div>
                    <div>{{ el.original_language}}</div>
                </div>

            </div>
        </section>

        <section class="container">
            <h2 class="text-uppercase">Series</h2>
            <div class="row column-gap-2">
                <div class="col-2 mb-3" v-for="el in store.seriesList">
                    <div>{{ el.name }}</div>
                    <div>{{ el.original_name}}</div>
                    <div>{{ el.vote_average }}</div>
                    <div>{{ el.original_language}}</div>
                </div>

            </div>
            
        </section>
    </main>
</template>

<script>
import { store } from '../assets/data/store';
    export default {
        name:'MainComponent',
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