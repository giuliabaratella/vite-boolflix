<template>
    <div class=" card-box">
        <div class="img-box">
            <div class="img-logo">B</div>
            <img :src="getImg" :alt="title">
        </div>
    </div>
</template>

<script>
import { store } from '../assets/data/store';

    export default {
        name:'cardBackdrop',
        data(){
            return{
                store,
            }
        },
        props: {
            imgSource: String,
            title: String,
        },
        computed:{

            getImg(){
                return this.imgSource ? (store.urlImg + store.imgSize.poster + this.imgSource) : 'img/404-not-found-backdrop.jpg'
            },
        }
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;

   
.img-box{
transition: all 0.1s;
width: 300px;
height: 100%;
position: relative;
    .img-logo{
        position: absolute;
        top: 0px;
        left: 10px;
        font-weight: bold;
        font-size: 1.8em;
        transform: scale(1, 1.4);
        color: $colorPrimary;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
    &:hover{
    cursor: pointer;
    // transform: scale(1.02);
    filter:brightness(40%);
    }
}

</style>
