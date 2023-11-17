<template>
    <main>

        <!-- offcanvas  -->
        <div class="offcanvas offcanvas-start p-3 overflow-y-auto" :class="{show : infoBox}" id="infobox" aria-labelledby="infobox">
            
            <div class="offcanvas-header row">
                <h4 class="text-uppercase col-10">{{title}}</h4>
                <button type="button" class="btn-close" aria-label="Close" @click="infoBox = false"></button>
                <h6 class="col-12">Titolo originale: {{ originalTitle }}</h6>
                <div class="d-flex">
                <img :src="getFlag" :alt="language" class="lang-img me-5">
                <div><i v-for="n in 5" :key="n" class="fa-star" :class="(n <= voteStars) ? 'fa-solid' : 'fa-regular'"></i></div>
            </div>
            </div>
            <div class="offcanvas-body">
                <div class="d-flex align-items-center column-gap-4 mb-4">
                    <h3>Guarda Ora</h3>
                    <button class="play-btn btn btn-outline-dark">
                        <i class="fa-solid fa-play ps-2"></i>
                    </button>
                </div>
                <p>{{overview}}</p>
            </div>
        </div>

        <!-- hero  -->
        <div id="main-hero" v-if="!store.showResults">
            <div class="hero-text ps-5">
                <img src="../assets/images/bridgerton-logo.png" alt="Bridgerton">
                <h3>#1 in Serie Tv Oggi</h3>
                <button class="btn me-3 px-3 fw-bold btn-play">
                    <i class="fa-solid fa-play pe-2"></i>
                    Play
                </button>
                <button class="btn px-3 fw-bold btn-add">
                    <i class="fa-solid fa-plus"></i>
                    Aggiungi alla Mia Lista
                </button>
                <p>Ispirata dall'omonima serie di romanzi della scrittrice Julia Quinn, il drama racconta la storia di Daphne (Phoebe Dynevor, Younger), la figlia maggiore della potente famiglia Bridgerton, e del suo debutto nel competitivo mercato matrimoniale londinese nell'età della Reggenza. </p>
                
            </div>
            <video autoplay muted>
                <source src="../assets/images/Bridgerton-trailer.mp4">
                Il tuo browser non supporta questo video
            </video>
        </div>

        <section id="popular" class="my-5 ps-5" v-if="!store.showResults">
            <div class="d-flex column-gap-2">
                        <h2>Più popolari</h2>
                        <button class="prev btn" @click="scrollBw('popularList')">&#10094;</button>
                        <button class="next btn" @click="scrollFw('popularList')">&#10095;</button>
                    </div>
                    <div class="list d-flex align-items-stretch flex-nowrap overflow-x-auto" ref="popularList">
                        <cardPoster v-for="(el,index) in store.popularList" :key="index"
                        :title="el.title"
                        :imgSource=" el.poster_path"
                        @click="getInfo(el.id, 'popularList')"/>
            
                    </div>
        </section>

        <div v-if="store.showResults">
            <!-- results: -->
            <div id="results" class="ps-5">
                <p class="my-5">Abbiamo trovato {{ store.moviesList.length }} risultati in Film e {{ store.seriesList.length }} risultati in Serie TV per : '{{ store.params.query }}'</p>
                <div v-if="!store.searchSeries && !store.searchMovies">
                    <p>Oops! Non abbiamo trovato quello che stavi cercando.</p>
                    <p>Prova ad effettuare una nuova ricerca.</p>
                </div>
            </div>
            <!-- movies  -->
            <div v-if="store.searchMovies || store.searchSeries" class="ps-5">
                <section id="movies" class="my-5">
                    <div class="d-flex column-gap-2">
                        <h2>Film</h2>
                        <button class="prev btn" @click="scrollBw('moviesList')">&#10094;</button>
                        <button class="next btn" @click="scrollFw('moviesList')">&#10095;</button>
                    </div>
                    <div class="list d-flex align-items-stretch flex-nowrap overflow-x-auto" ref="moviesList">
                        <cardBackdrop v-for="(el,index) in store.moviesList" :key="index"
                        :title="el.title"
                        :imgSource=" el.backdrop_path"
                        @click="getInfo(el.id, 'moviesList')"/>
            
                    </div>
                </section>
                <!-- series  -->
                <section id="series" class="my-5">
                    <div class="d-flex column-gap-2">
                        <h2>Serie TV</h2>
                        <button class="prev btn"  @click="scrollBw('seriesList')">&#10094;</button>
                        <button class="next btn" @click="scrollFw('seriesList')">&#10095;</button>
                    </div>
                    <div class="list d-flex align-items-stretch flex-nowrap overflow-x-auto" ref="seriesList">
                        <cardBackdrop v-for="el in store.seriesList"
                        :title="el.name"
                        :imgSource=" el.backdrop_path"
                        @click="getInfo(el.id, 'seriesList')"/>
                    </div>
            
                </section>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
import { store } from '../assets/data/store';
import welcomeBanner from './welcomeBanner.vue';
import cardBackdrop from './cardBackdrop.vue';
import cardPoster from './cardPoster.vue';

    export default {
        name:'MainComponent',
        components:{
            cardBackdrop,
            cardPoster,
            welcomeBanner,
        },
        data(){
            return{
                store,
                infoBox: false,
                title:'',
                originalTitle: '',
                overview:'',
                language:'',
                raiting:'',
                flags:[
                    'ca',
                    'de',
                    'en',
                    'fr',
                    'it',
                    'ja',
                    'kr',
                    'us',
                ],
            }
        },
        methods:{
            getInfo(id, list){
                const el = this.store[list].find((el)=> el.id === id);
                this.infoBox= true;
                this.overview= el.overview;
                this.language= el.original_language;
                this.raiting= el.vote_average;
                if(el.name){
                    this.title= el.name;
                    this.originalTitle= el.original_name;
                }else if(el.title){
                    this.title= el.title;
                    this.originalTitle= el.original_title;
                }
            },

            scrollFw(section){
                this.$refs[section].scrollBy({
                    left: 800,
                    behavior: "smooth",
                });
               
            },
            scrollBw(section){
                this.$refs[section].scrollBy({
                    left: -800,
                    behavior: "smooth",
                });
            },
            getPopular(){
                store.popularList=[];
                const popularUrl = this.store.urlApi + this.store.endpoint.popular;
                axios.get(popularUrl, {params: this.store.params}).then((resp)=>{
                    this.store.popularList = resp.data.results;
                    console.log(this.store.popularList)
                })
                
            }
         },
        computed:{
            voteStars(){
                return Math.ceil(this.raiting / 2);
            },
            getFlag(){
                let languageSource= '';
                if(!this.flags.includes(this.language)){
                languageSource='img/flags/noflag.png'
                } else {
                languageSource = `img/flags/${this.language}.svg`
                }
                return languageSource;
            },
        },
        created(){
            this.getPopular();
        }
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;
main {
    background-color: $colorDark;
    color: $colorLight;
    height: calc(100vh - 80px);
    width: 100%;
    overflow-y: auto;
    
        &::-webkit-scrollbar {
        display: none;
        }
        
    h2, .btn{
        margin-bottom: 20px;
    }
    .btn {
                background-color: $colorDarkGrey;
            }
    .list{
        transition: all 0.2s;
            &::-webkit-scrollbar {
            display: none;
            }
            
    }
    
    
    .offcanvas {
        border: 0;
        background: linear-gradient(180deg, #000 61.24%, rgba(144, 0, 0, 0.76) 100%);
        color: $colorLight;
        
        .offcanvas-body::-webkit-scrollbar {
        display: none;
        }
        h4, h6{
            color: $colorPrimary;
        }
        .btn-close{
            background-color: $colorLight;
        }
        .lang-img{
        width: 20px;
        }
        .play-btn{
            width: 100px;
            height: 70px;
            .fa-play{
            font-size: 3em !important;
            }
        }
        
    }
    #results {
        p {
            font-size: 1.5em;
        }
    }
    #main-hero {
        position: relative;
        width: 100%;
        height: 800px;
        
        video {
            z-index: 500;
            // position: absolute;
            // left: 0;
            // top: 0;
            height: 100%;
            width: 100%;
            object-fit: cover;
            -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
            mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
        }
        .hero-text {
            z-index: 1000;
            position: absolute;
            left: 0;
            top: 20%;
            max-width: 600px;
            text-shadow: 0 0 3px black;
                .btn-play{
                    background-color: $colorLight;
                    border-radius: 3px;
                }
                .btn-add{
                    border-radius: 3px;
                    color: $colorLight;
                    background-color: rgba($color: #5f5c5c, $alpha: 0.6);
                }
                img{
                    width: 70%;
                }
        }
    }
}
    
</style>