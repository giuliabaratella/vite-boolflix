<template>
    <div id="welcome" class="d-flex align-items-center justify-content-center px-5">
        <div class="welcome-msg d-flex flex-column justify-content-center ">
            <h2>Benvenut* su Boolflix!</h2>
            <h4 class="text-uppercase mb-5">Guarda film e serie tv ovunque tu voglia.</h4>
            <button class="btn text-uppercase" @click="$emit('enterBoolflix')">Entra nel sito</button>
        </div>
    </div>
</template>

<script>
import {store} from '../assets/data/store';
    export default {
        name: 'welcomeBanner',
        data(){
            return {
                store
            }
        }
        
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;

#welcome {
    width: 100%;
    height: 100vh;
    position: relative;
    background-image: url(../assets/images/welcome.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    .welcome-msg {
        color: $colorLight;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(90deg, #000 0%, rgba(27, 25, 25, 0.50) 70.41%, rgba(0, 0, 0, 0.03) 99.99%, rgba(45, 41, 41, 0.00) 100%);
        padding: 20px;
        h2 {
            font-weight: 900;
            font-size: 4em;
            color: $colorPrimary;
        }
        h4 {
            font-size: 2em;
        }
        .btn {
            background-color: $colorPrimary;
            width: fit-content;
            font-size: 1.8em;
            padding-left: 100px;
            padding-right: 100px;
            border-radius: 0;
        }
    }
}
</style>