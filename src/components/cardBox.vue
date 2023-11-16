<template>
    <div class=" card-box text-center">
        <div class="img-box">
            <img :src="getImg" :alt="title">
        </div>
        <!-- <div class="card-text p-2">
            <h5 class="text-uppercase mb-3">{{title}}</h5>
            <div class="original-title mb-3">{{originalTitle}}</div>
            <div class="d-flex justify-content-evenly">
                <img :src="getFlag" :alt="language" class="lang-img">
                <div><i v-for="n in 5" :key="n" class="fa-star" :class="(n <= voteStars) ? 'fa-solid' : 'fa-regular'"></i></div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { store } from '../assets/data/store';

    export default {
        name:'cardBox',
        data(){
            return{
                store,
            }
        },
        props: {
            imgSource: String,
            title: String,
            originalTitle: String,
            language:String,
            raiting: Number,
        },
        computed:{

            getImg(){
                return this.imgSource ? (store.urlImg + store.imgSize.poster + this.imgSource) : 'img/flags/noflag.png'
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;
.card-box{
    width: 300px;
    // padding-left: 0 !important;
    // padding-right: 0 !important;
    background-color: $colorHeaderBg;
    color: $colorLight;
    transition: all 0.1s;
    .card-text{
        h5{
            color: $colorPrimary;
        }
    }
    .img-box{
        width: 300px;
        height: 450px;
        img {
            width: 300px;
            height: 450px;
            object-fit: cover;
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
