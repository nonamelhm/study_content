<template>
  <div>
    <div id="normalMap" style="width:888px;height:888px;margin: 0 auto;"></div>
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
      })
    },
    methods: {

    }
  }
</script>

<style>

</style>
