<template>
  <div id="mapFunction">
    <ul class="flex noList white" style="padding:5px">
      <li class="point" style="margin:0px 5px;" @click="_drawPoint(map,url)">{{isClick?'取消绘点':'点击绘点'}}</li>
      <li class="point" style="margin:0px 5px;" @click="_drawPolyline(map)">{{isPolyline?'取消画线':'点击画线'}}</li>
      <li class="point" style="margin:0px 5px;" @click="_drawPolygon(map)">{{isPolygon?'取消多边形':'点击画多边形'}}</li>
      <li class="point measure" style="margin:0px 5px;" @click="_measureDistance(map,id)">{{isMeasure?'取消测量':'测量距离'}}</li>
      <li class="point" style="margin:0px 5px;" @click="_playback(map)">{{isPlayback?'停止回放':'回放轨迹'}}</li>
      <li class="point" style="margin:0px 5px;" @click="_playBack2(map)">{{isPlayback2?'停止回放2':'回放轨迹2'}}</li>
      <li class="point" style="margin:0px 5px;" @click="_changeLayers(map)">切换图层</li>
    </ul>
  </div>
</template>

<script>
  import mapMixin from '@/mixins/mapMixin.js'
  export default{
    name:'mapFunction',
    mixins:[mapMixin],
    props:{
      map: null,
      url: null,
      id: null
    },
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>

<style>
</style>
