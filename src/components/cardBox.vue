<template>
    <div class="col-12 col-md-4 col-lg-3 col-xl-2 card-box text-center">
        <div class="img-box mb-3">
            <img :src="store.urlImg + store.imgSize.poster + imgSource" :alt="title">
        </div>
        <div class="card-text p-2">
            <h5 class="text-uppercase mb-3">{{title}}</h5>
            <div class="original-title mb-3">{{originalTitle}}</div>
            <div class="d-flex justify-content-evenly">
                <img :src="getFlag" :alt="language" class="lang-img">
                <div><i v-for="n in 5" :key="n" class="fa-star" :class="(n <= voteStars) ? 'fa-solid' : 'fa-regular'"></i></div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../assets/data/store';

    export default {
        name:'cardBox',
        data(){
            return{
                store,
                flags:[
                    'ca',
                    'de',
                    'en',
                    'fr',
                    'it',
                    'ja',
                    'kr',
                    'us',
                ]
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
            getFlag(){
                let languageSource= '';
                if(!this.flags.includes(this.language)){
                languageSource='img/flags/noflag.png'
                } else {
                languageSource = `img/flags/${this.language}.svg`
                }
                return languageSource;
            },
            voteStars(){
                return Math.ceil(this.raiting / 2);
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;
.card-box{
    
    padding-left: 0 !important;
    padding-right: 0 !important;
    background-color: $colorHeaderBg;
    color: $colorLight;
    transition: all 0.1s;
    .card-text{
        h5{
            color: $colorPrimary;
        }
    }
    .img-box{
        width: 100%;
        img {
            width: 100%;
        }
    }
    .original-title{
        font-size: 0.8em;
    }
    .lang-img{
        width: 20px;
    }
    &:hover{
        cursor: pointer;
        transform: scale(1.02);
        filter:brightness(40%);
    }
}
</style>
