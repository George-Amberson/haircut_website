<template>
    <b-card style="margin-bottom:1rem;">
        <div class="d-flex justify-content-start" >
            {{this.title}}
        </div>
        <b-row>
            <b-col cols="9" class="d-flex justify-content-start">{{this.text}}</b-col>
            <b-col cols="1"/>
            <b-col cols="2" class="d-flex justify-content-end">
        <b-button @click="showUslugi(time)" class="button"> <b-icon-arrow-right-circle/></b-button>
        </b-col>
        </b-row>
        <div class="d-flex justify-content-start" style="margin-bottom:0;">
            <div class="money">
           {{this.price}}  
           </div>
             <div class="time">
           <b-icon-clock style="margin-left:1rem; margin-top:3px; margin-right:4px"/> 
           {{this.ctime}}
           </div>
        </div>
    </b-card>
</template>


<script>
import { BCard, BCardBody, BButton, BIconArrowRightCircle, BIconClock, BRow,BCol } from 'bootstrap-vue'

export default {
    props:[
        'title',
        'text',
        'price',
        'ctime',
        'time'
    ],

    components:{
        BCard,
        BCardBody,
        BButton,
        BIconArrowRightCircle,
        BIconClock,
        BRow,
        BCol
    },
    methods:{
        showUslugi(time){
            this.$emit('usluga',{time})
        },
    }
}
</script>


<style scoped>
.money{
  font-weight: 600;  
  font-size:20px;
}
.time{
    color:#a69999;
    margin-top:4px
}
.button,.button:focus,.button:active,.button:hover{
    background-color:white !important;
    color:black !important;
    border-color:white !important;
    box-shadow:none !important;
}
</style>