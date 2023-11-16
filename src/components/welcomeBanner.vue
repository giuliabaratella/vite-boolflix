<template>
    <div id="welcome" class="d-flex align-items-center justify-content-center px-5">
        <div class="welcome-msg">
            <h2>Benvenut* su Netflix!</h2>
            <h5>Comincia a cercare serie o film nella barra di ricerca in alto.</h5>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'welcomeBanner',
        
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;

#welcome {
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/welcome.jpg);
    .welcome-msg {
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        padding: 20px;
        h2 {
            font-size: 4em;
            color: $colorPrimary;
        }
    }
}
</style>