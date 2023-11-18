<template>
    <div id="error-box" class="d-flex align-items-center px-5">
        <div>
            <div class="oh-no">Oh no!</div>
            <p>Sembra che ci sia un problema nei nostri server. Prova a ricaricare la pagina.</p>
        </div>
    </div>
</template>

<script>
import { store } from '../assets/data/store';
    export default {
        name: 'ErrorBanner',
        data(){
            return{
                store
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;

#error-box{
    background: linear-gradient(180deg, #000 59.87%, rgb(94, 30, 30) 100%);
    color: $colorLight;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size:2em;
    .oh-no{
        color: $colorPrimary;
        font-size: 2.5em;
    }
    .error-code{
        background-color: rgba($color: #5a0c0c, $alpha: 0.6);
        border-radius: 5px;
        padding: 10px 15px;
    }
}
</style>