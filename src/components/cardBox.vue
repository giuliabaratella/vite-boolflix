<template>
    <div class="col-12 col-md-4 col-lg-3 col-xl-2 card-box text-center mb-3 ">
        <!-- <div class="img-box mb-3">
            <img :src="img" :alt="title">
        </div> -->
        <div class="card-text p-2">
            <h5 class="text-uppercase mb-3">{{title}}</h5>
            <div class="original-title">{{originalTitle}}</div>
            <div class="d-flex justify-content-between ">
                <div class="lang-box">
                    <img :src="getFlag()" :alt="language">
                </div>
                <div>{{ raiting }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'cardBox',
        data(){
            return{
            }
        },
        props: {
            // img: String,
            title: String,
            originalTitle: String,
            language:String,
            raiting: Number,
        },
        methods:{
            getFlag(){
                let languageSource= '';
                if(this.language !== 'es'&&
                this.language !== 'ca'&&
                this.language !== 'de'&&
                this.language !== 'en'&&
                this.language !== 'fr'&&
                this.language !== 'it'&&
                this.language !== 'ja'&&
                this.language !== 'kr'&&
                this.language !== 'us'
                ){
                languageSource='img/flags/noflag.png'
                } else {
                languageSource = `img/flags/${this.language}.svg`
                }
                return languageSource;
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
    .card-text{
        h5{
            color: $colorPrimary;
        }
    }
    // .img-box{
    //     width: 100%;
    //     img {
    //         width: 100%;
    //     }
    // }
    .original-title{
        font-size: 0.8em;
    }
    .lang-box{
        width: 20px;
        img{
            width: 100%;
        }
    }
}
</style>
