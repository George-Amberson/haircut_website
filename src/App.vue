<template>
  <div id="app">
     <b-card no-body>
    <b-tabs card >
      <b-tab title="Доступные услуги" active @click="seconscount=0;">
        <serve @usluga="openTime($event)" v-for="(item, i) in s" :key="i" :title="item.title" :text="item.text" :price="item.price" :ctime="item.ctime" :time="item.time"/>
      </b-tab>
      <b-tab title="Доступное время " class="override-paddings" :disabled="seconscount==0" :active="seconscount!=0">
        <Time :time="seconscount" :block_time="r"/>
      </b-tab>
    </b-tabs>
  </b-card>
  </div>
</template>

<script>
import Time from './components/time.vue'
import serve from './components/s.vue'
import { BTab, BCard, BTabs,BCardText} from 'bootstrap-vue'

export default {
  name: 'App',
  components: {
    Time,
    BTab,
    BCard,
    BTabs,
    BCardText,
    serve
  },
  methods:{
    openTime(event){
      this.seconscount=event.time
    },
    async requestS(){
      this.s = (await(await fetch('/s')).json()).services  
    },
    async requestR(){
      this.r =(await(await fetch('/r')).json()).records
    },
  },
  async created(){
     await this.requestS()
     await this.requestR()
  },
  data(){
    return {
      seconscount:0,
      s:[],
      r:[]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.override-paddings{
  padding-left:0;
  padding-right:0;
  padding-top: 0;
  padding-bottom:0;
  border-bottom:none;
}
</style>
