<template>
    <Header class="py-3 px-5">
        <div class="row align-items-center justify-content-between ">
            <h1 class="text-uppercase m-0 d-none d-sm-block col-sm-2">
                Boolflix
            </h1>
            <div id="search-bar" class="col-12 col-sm-8 col-lg-6 col-xl-4 d-flex">
                <div class="d-none d-md-flex pe-3">
                    <a href="#" @click.prevent><i class="fa-solid fa-heart"></i></a>
                    <a href="#" @click.prevent><i class="fa-solid fa-user"></i></a>
                    <a href="#" @click.prevent><i class="fa-solid fa-bell"></i></a>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Cerca Film o serie Tv" aria-label="search" aria-describedby="search" v-model="searchInput" @keyup.enter="$emit('search',searchInput)">
                    <button class="btn input-group-text" id="search" @click="$emit('search',searchInput)">Cerca</button>
                </div>
            </div>
        </div>
    </Header>
</template>

<script>
    export default {
        name:'HeaderComponent',
        data(){
            return{
                searchInput:'',

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
    h1{
    color: $colorPrimary;
    }
    a{
        color: $colorLight;
        font-size: 1.3em;
        padding: 10px;
        &:hover{
            opacity: 50%;
        }
    }
    .btn {
        background-color: $colorPrimary;
    }
}
</style>