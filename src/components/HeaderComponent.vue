<template>
    <header class="py-3 px-5">
        <div class="row align-items-center justify-content-between ">
            <h1 class="text-uppercase m-0 d-none d-lg-block col-lg-2">
                Boolflix
            </h1>
            <h2 class="text-uppercase m-0 d-block d-lg-none col-1 ">B</h2>
            <ul class="col-2 col-sm-1 col-md-2 col-xl d-flex align-items-center mb-0">
                <li><a href="#" @click.prevent="homepage" class="fw-bold">Home</a></li>
                <li><a href="#" @click.prevent="search" class="d-none d-lg-block">Cerca</a></li>
                <li><a href="#" @click.prevent class="d-none d-xl-block">Scopri</a></li>
                <li><a href="#" @click.prevent class="d-none d-xl-block">Impostazioni</a></li>
            </ul>
            <!-- <a href="#" @click.prevent="homepage" class="col-2 col-sm-1 col-md-2 col-xl fw-bold">Home</a> -->
            <div id="search-bar" class="col-9 col-sm-8 col-lg-6 col-xl-4 d-flex">
                <ul class="d-none d-md-flex pe-3 mb-0">
                    <li><a href="#" @click.prevent><i class="fa-solid fa-heart"></i></a></li>
                    <li><a href="#" @click.prevent><i class="fa-solid fa-user"></i></a></li>
                    <li><a href="#" @click.prevent><i class="fa-solid fa-bell"></i></a></li>
                </ul>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Cerca Film o serie Tv" aria-label="search" aria-describedby="search" v-model="searchInput" @keyup.enter="$emit('search',searchInput)">
                    <button class="btn input-group-text" id="search" @click="$emit('search',searchInput)">Cerca</button>
                </div>
            </div>
        </div>
    </Header>
</template>

<script>
import { store } from '../assets/data/store';

    export default {
        name:'HeaderComponent',
        data(){
            return{
                searchInput:'',
                store,

            }
        },
        methods:{
            homepage(){
                store.showResults= false;
                store.searchWarning = false;
                store.startSearch= false;

            },
            search(){
                store.startSearch= true;
            }
        }

    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;

header {
    height: 80px;
    width: 100%;
    background-color: $colorDark;
    color: $colorLight;
    z-index: 5000;
    h1, h2{
    color: $colorPrimary;
    }
    h2{
        font-size: 2.5em;
    }
    li{
        list-style-type: none;
        a{
        color: $colorLight;
        font-size: 1.3em;
        padding: 10px;
        text-decoration: none;
        &:hover{
            opacity: 50%;
        }
    }
    }
    
    .btn {
        background-color: $colorPrimary;
    }
}
</style>