<template>
    <Header class="py-3 px-5">
        <div class="row">
            <h1 class="text-uppercase m-0 d-none d-sm-block col-sm-2">
                Boolflix
            </h1>
            <div class="col"></div>
            <div id="search-bar" class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search film or TV series" aria-label="search" aria-describedby="search" v-model="searchInput" @keyup.enter="$emit('search',searchInput)">
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
    width: 100%;
    background-color: $colorDark;
    color: $colorLight;
    h1{
    color: $colorPrimary;

    }
    .btn {
        background-color: $colorPrimary;
    }
}
</style>