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

        <!-- welcome  -->
        <welcomeBanner v-if="!store.showResults"/>

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
                    <btn class="prev btn" @click="scrollBw('moviesList')">&#10094;</btn>
                    <btn class="next btn" @click="scrollFw('moviesList')">&#10095;</btn>
                </div>
                <div class="list d-flex align-items-stretch flex-nowrap overflow-x-auto" ref="moviesList">
                    <cardBox v-for="(el,index) in store.moviesList" :key="index"
                    :title="el.title"
                    :imgSource=" el.backdrop_path"
                    @click="getInfo(el.id, 'moviesList')"/>
            
                </div>
            </section>
            <!-- series  -->
            <section id="series" class="my-5">
                <div class="d-flex column-gap-2">
                    <h2>Serie TV</h2>
                    <btn class="prev btn"  @click="scrollBw('seriesList')">&#10094;</btn>
                    <btn class="next btn" @click="scrollFw('seriesList')">&#10095;</btn>
                </div>
                <div class="list d-flex align-items-stretch flex-nowrap overflow-x-auto" ref="seriesList">
                    <cardBox v-for="el in store.seriesList"
                    :title="el.name"
                    :imgSource=" el.backdrop_path"
                    @click="getInfo(el.id, 'seriesList')"/>
                </div>
            
            </section>
        </div>
    </main>
</template>

<script>
import { store } from '../assets/data/store';
import welcomeBanner from './welcomeBanner.vue';
import cardBox from './cardBox.vue';
    export default {
        name:'MainComponent',
        components:{
            cardBox,
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

}
    
</style>