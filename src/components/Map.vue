<template>
  <div id="Map" class="relative">
    <div class="relative" style="width:888px;height:888px;margin: 0 auto;">
      <div id="normalMap" style="width:888px;height:888px;margin: 0 auto;"></div>
      <div class="absolute" style="bottom:10px;right:35px;z-index:9999;">
        <ul class="gray noList textL" style="padding:10px;border-radius:10px">
          <li>经度：{{lat}}</li>
          <li>纬度：{{lng}}</li>
        </ul>
      </div>
     <map-function class="absolute" id="normalMap" :map="map" :url="url" style="top:2px;right:10px;z-index:9999;"></map-function>
    </div>
  </div>
</template>

<script>
  import mapMixin from "../mixins/mapMixin"
  import mapFunction from '@/components/mapFunction'
  export default {
    name: 'Map',
    components:{
      mapFunction
    },
    mixins: [mapMixin],
    data() {
      return {
        map: null,
        url:require('@/assets/logo.png')
      }
    },
    mounted() {
      this.$nextTick(()=>{  //重要，先渲染dom才能得到id
         this.map = this._createMap('normalMap')
         this._getLatLng(this.map)
         this._getZoom(this.map)
      })
    },
    methods: {

    }
  }
</script>

<style>
@import '~@/assets/css/flex.css';
@import '~@/assets/css/common.css';
</style>
