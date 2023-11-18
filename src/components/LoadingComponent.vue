<template>
    <div id="loading" class="d-flex justify-content-center align-items-center">
        <div class="spinner"></div>
    </div>
</template>

<script>

export default {
    name: 'LoadingComponent',
    data () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables.scss' as *;
#loading{
    // background-color: $colorDark;
    height: calc(100vh - 80px);
    .spinner {
        width: 150px;
        height: 150px;
        border: 8px solid;
        border-color: $colorPrimary transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        // background-color: $colorDark;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
    

}
    
</style>