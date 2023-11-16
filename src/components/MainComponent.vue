<template>
    <main>
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
                <p>{{overview}}</p>
            </div>
        </div>
        <section id="movies" class="ps-5 my-5">
            <div class="d-flex column-gap-2">
                <h2>Film</h2>
                <btn class="prev btn" @click="scrollBw('movie')">&#10094;</btn>
                <btn class="next btn" @click="scrollFw('movie')">&#10095;</btn>
            </div>
            <div class="list d-flex align-items-stretch flex-nowrap overflow-x-auto" ref="moviesList">
                <cardBox v-for="(el,index) in store.moviesList" :key="index"
                :title="el.title" 
                :originalTitle="el.original_title" 
                :raiting="el.vote_average" 
                :language="el.original_language"
                :imgSource=" el.poster_path"
                @click="getInfo(el)"/>
                

            </div>
        </section>

        <section id="series" class="ps-5 my-5">
            <div class="d-flex column-gap-2">
                <h2>Serie TV</h2>
                <btn class="prev btn"  @click="scrollBw('series')">&#10094;</btn>
                <btn class="next btn" @click="scrollFw('series')">&#10095;</btn>
            </div>
            <div class="list d-flex align-items-stretch flex-nowrap overflow-x-auto" ref="seriesList">

                <cardBox v-for="el in store.seriesList"
                :title="el.name" 
                :originalTitle="el.original_name" 
                :raiting="el.vote_average" 
                :language="el.original_language"
                :imgSource=" el.poster_path"
                @click="getInfo(el)"/>


            </div>
            
        </section>
    </main>
</template>

<script>
import { store } from '../assets/data/store';
import cardBox from './cardBox.vue';
    export default {
        name:'MainComponent',
        components:{
            cardBox,
        },
        data(){
            return{
                store,
                activeIndex:'',
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
                ]
            }
        },
        methods:{
            getInfo(el){
                this.infoBox= true;
                console.log(this.activeIndex);
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
            scrollFw(el){
                if (el === 'movie'){
                    this.$refs.moviesList.scrollBy({
                    left: 800,
                    behavior: "smooth",
                });
                }else if (el === 'series'){
                this.$refs.seriesList.scrollBy({
                    left: 800,
                    behavior: "smooth",
                });
               
                }
         },
            scrollBw(el){
                if (el === 'movie'){
                    this.$refs.moviesList.scrollBy({
                    left: -800,
                    behavior: "smooth",
                    });
                }else if (el === 'series'){
                    this.$refs.seriesList.scrollBy({
                        left: -800,
                        behavior: "smooth",
                    });
                }
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
        
    }

}
    
</style>