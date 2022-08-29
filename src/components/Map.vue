<template>
  <div id="Map" class="relative">
    <div id="normalMap" style="width:888px;height:888px;margin: 0 auto;"></div>
    <div class="fixed" style="bottom:10px;right:35px;z-index:9999;">
      <ul class="gray noList textL" style="padding:10px;border-radius:10px">
        <li>经度：{{lat}}</li>
        <li>纬度：{{lng}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import mapMixin from "../mixins/mapMixin"
  export default {
    name: 'Map',
    mixins: [mapMixin],
    data() {
      return {
        map: null
      }
    },
    mounted() {
      this.$nextTick(()=>{  //重要，先渲染dom才能得到id
         this.map = this._createMap('normalMap')
         this._getLatLng(this.map)
         this._getZoom(this.map)
         this._drawPoint(this.map,require('@/assets/logo.png')) //引入图片
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
