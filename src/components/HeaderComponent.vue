<template>
    <Header class="py-3 px-5">
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="text-uppercase m-0">
                Boolflix
            </h1>
            <div id="search-bar">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search film or TV series" aria-label="search" aria-describedby="search" v-model="searchInput">
                    <button class="btn input-group-text" id="search" @click="$emit('search',searchInput)">Search</button>
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
    background-color: $colorHeaderBg;
    color: $colorLight;
    h1{
    color: $colorPrimary;

    }
    .btn {
        background-color: $colorPrimary;
    }
}
</style>