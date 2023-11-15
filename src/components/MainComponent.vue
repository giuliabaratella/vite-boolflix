<template>
    <main>
        <section class="container">
            <h2 class="text-uppercase">Movies</h2>
            <div></div>
        </section>
        <section class="container">
            <h2 class="text-uppercase">Series</h2>
            <div></div>
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
    height: calc(100vh - 80px);
    h2{
        color: $colorPrimary;
    }
}

</style>