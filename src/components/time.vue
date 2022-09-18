<template>
  <div >
    <b-modal id="mw" title="Хотите записаться? Укажите телефон и имя для связи">
       <b-form-input type="tel" placeholder="Телефон" v-model="tel"></b-form-input>
       <br>
       <b-form-input type="email" placeholder="Имя" v-model="name"></b-form-input>
      <template #modal-footer>
         <b-button variant="primary" @click="ok()">OK</b-button>
         <b-button variant="danger" @click="cancel()">Отмена</b-button>
       </template>
    </b-modal>
      <div class="d-flex justify-content-center header">
      ВЫБЕРИТЕ ВРЕМЯ
      </div>
      <div  style="background-color:white">
      <b-row class="d-flex justify-content-center month">
          {{getMonthandYear()}}
      </b-row>
      <b-row class="d-flex justify-content-center">
         <div v-for="(item,i) in get_week()" :key="i" :class="[(item.getDay()!=date.getDay())?'unfreeday':'','day']">
             {{getDay(item)}}
         </div>
      </b-row>
      </div>
      <div  class="justify-content-start override-div">
          <b-button v-for="(item,i) in get_times" :key="i" class="b-button" :disabled="item.block" @click="record(item)">{{item.text}}</b-button>
     </div>
  </div>
</template>


<script>
import {BRow, BButton} from 'bootstrap-vue'
export default {
    props:[
        'time',
        'block_time'
    ],
data(){
    return{
        date:new Date(),
        st:0,
        fn:0,
        name:'',
        tel:''
    }
},
components:{
    BRow,
    BButton
},
computed:{
get_times(){
        return [
            '08:00','08:30','09:00','09:30','10:00',
            '10:30','11:00','11:30','12:00','12:30',
            '13:00','13:30','14:00','14:30','15:00',
            '15:30','16:00','16:30','17:00','17:30',
            '18:00','18:30','19:00','19:30','20:00',
            '21:30','22:00','22:30'
            ].map((item)=>{
                return {text:item, block:false}
            }, this)
            .map((item)=>{
                if(this.generate_date(item.text)<this.date) item.block=true
                for(let it of this.block_time){
                    if(((this.generate_date(item.text)>=new Date(it.start))&&(this.generate_date(item.text)<=new Date(it.finish)))
                    ||((new Date(item.text).setMilliseconds(this.time)>=it.start)&&(new Date(item.text).setMilliseconds(this.time)<=it.finish))) item.block=true

                }
                return item
            }, this)
    },
},
methods:{
    getMonthandYear(){
        return this.date.toLocaleString('ru-RU', {month:'long', year:'numeric'})
    },
    getDay(date){
        return date.toLocaleString('ru-RU', {day:'numeric'})
    },
    get_week(){
        return [1,2,3,4,5,6,7].map((item,i)=>{
            return new Date(new Date().setDate(this.date.getDate()+(i-3)))
        },this)
    },
    generate_date(str){
        let date = new Date()
        date.setHours(Number(str.slice(0,str.indexOf(':'))))
        date.setMinutes(Number(str.slice(str.indexOf(':')+1)))
        date.setSeconds(0)
        date.setMilliseconds(0)
        return date
    },
    
    record(b){
        this.st=this.generate_date(b.text).setMilliseconds(-300000)
        this.fn=this.generate_date(b.text).setMilliseconds(this.time+300000)
        this.$bvModal.show('mw')
    },
    async ok(){
        let result = {
            start:this.st,
            finish: this.fn,
            name: this.name,
            phone: this.tel
        }
        await fetch('/r',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(result)
        })
        this.block_time = (await(await fetch('/r')).json()).records
        this.$bvModal.hide('mw')
    },
    cancel(){
       this.name=''
       this.tel=''
       this.$bvModal.hide('mw') 
    }
}
}
</script>

<style>
.header{
    background-color: #f8f8f8;
    min-height: 3rem !important;
    padding-top:1rem;
    padding-bottom:1rem;
    margin-top:0;
    /* margin-right:2em; */
    font-size:2rem;
}
.month{
    font-size:2rem;
}
.day{
    font-size:3rem;
    margin-right:3rem;
}
.unfreeday{
    color:#d7d7d7;
}
.override-div{
    background-color: #f8f8f8; 
    padding-left:15rem !important; 
    padding-right:15rem !important; 
    margin-top:1rem !important;
}
.b-button, .b-button:hover{
  margin-right:1em;
  margin-bottom:1rem;
  margin-top:1rem;
  background-color: white;
  color:black;
}
 .b-button:focus .b-button:disabled,button[disabled]{
   background-color: #f8f8f8 !important;  
   color:black!important;
   box-shadow: none;
}
</style>
