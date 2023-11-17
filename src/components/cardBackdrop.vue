<template>
    <div class=" card-box">
        <div class="img-box">
            <h3 class="img-title text-uppercase mb-0">{{ title }}</h3>
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
                return this.imgSource ? (store.urlImg + store.imgSize.backdrop + this.imgSource) : 'img/404-not-found-backdrop.jpg'
            },
        }
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;
.card-box{
    width: 300px;
    height: 169px;
    background-color: $colorDark;
    color: $colorLight;
    transition: all 0.1s;
    .card-text{
        h5{
            color: $colorPrimary;
        }
    }
    .img-box{
        width: 300px;
        height: 100%;
        position: relative;
            .img-logo{
                position: absolute;
                top: 0px;
                left: 10px;
                font-weight: bold;
                font-size: 1.3em;
                transform: scale(1, 1.3);
                color: $colorPrimary;
            }
            .img-title {
                position: absolute;
                bottom: 0px;
                right: 0px;
                font-weight: bold;
                color: $colorLight;
                text-shadow: 0 0 4px black;
                font-size: 1.2em;
                width: 100%;
                padding: 5px 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
    .original-title{
        font-size: 0.8em;
    }
    
    &:hover{
        cursor: pointer;
        // transform: scale(1.02);
        filter:brightness(40%);
    }
}
</style>
