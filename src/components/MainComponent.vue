<template>
    <main>

        <LoadingComponent v-if="this.store.loading"/>

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

        <div id="homepage"  v-if="!store.showResults && !store.searchWarning">
            <!-- hero  -->
            <div id="main-hero">
                <div class="hero-text ps-5 mb-0">
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
                <div class="video-fade"></div>
                <video autoplay muted>
                    <source src="../assets/images/Bridgerton-trailer.mp4">
                    Il tuo browser non supporta questo video
                </video>
            </div>


            <section id="popular" class="mb-5 ps-5">
                <div class="d-flex column-gap-2">
                            <h2>Film più popolari</h2>
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

            <section id="top-rated" class="mb-5 ps-5">
                <div class="d-flex column-gap-2">
                            <h2>Film più votati</h2>
                            <button class="prev btn" @click="scrollBw('topRatedList')">&#10094;</button>
                            <button class="next btn" @click="scrollFw('topRatedList')">&#10095;</button>
                        </div>
                        <div class="list d-flex align-items-stretch flex-nowrap overflow-x-auto" ref="topRatedList">
                            <cardPoster v-for="(el,index) in store.topRatedList" :key="index"
                            :title="el.title"
                            :imgSource=" el.poster_path"
                            @click="getInfo(el.id, 'topRatedList')"/>
            
                        </div>
            </section>
            
        </div>

        <!-- results: -->
        <div v-if="store.searchWarning" class="ps-5 mt-5" id="search-warning">
            <h3>Oops!</h3>
            <p>Non abbiamo trovato quello che stavi cercando.</p>
            <p>Prova ad effettuare una nuova ricerca.</p>
        </div>
        
        <div id="search-content" v-if="store.showResults" class="ps-5">
            <div id="results">
                <p class="my-5">Abbiamo trovato {{ store.moviesList.length }} risultati in Film e {{ store.seriesList.length }} risultati in Serie TV per : '{{ store.params.query }}'</p>
            </div>

            <!-- movies  -->
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

    </main>
</template>

<script>
import axios from 'axios';
import { store } from '../assets/data/store';
import welcomeBanner from './welcomeBanner.vue';
import cardBackdrop from './cardBackdrop.vue';
import cardPoster from './cardPoster.vue';
import LoadingComponent from './LoadingComponent.vue';


    export default {
        name:'MainComponent',
        components:{
            cardBackdrop,
            cardPoster,
            welcomeBanner,
            LoadingComponent,
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
                
            },
            getRated(){
                store.topRatedList=[];
                const topRatedUrl = this.store.urlApi + this.store.endpoint.topRated;
                axios.get(topRatedUrl, {params: this.store.params}).then((resp)=>{
                    this.store.topRatedList = resp.data.results;
                    console.log(this.store.topRatedList)
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
            this.getRated();
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
    #results, #search-warning {
        p {
            font-size: 1.5em;
        }
        h3{
            font-size: 4em;
            margin-bottom: 30px;
        }
    }
    #main-hero {
        position: relative;
        width: 100%;
        height: 700px;
        .video-fade {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 600;
            background: linear-gradient(180deg, rgba(11, 11, 11, 0.00) 60.98%, #000 100%);
        }
        
        video {
            z-index: 500;
            position: absolute;
            left: 0;
            top: 0px;
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: center;
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