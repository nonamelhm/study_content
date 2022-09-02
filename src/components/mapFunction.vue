<template>
  <div id="mapFunction">
    <ul class="flex noList white" style="padding:5px">
      <li class="point" style="margin:0px 5px;" @click="_drawPoint(map,url)">{{isClick?'取消绘点':'点击绘点'}}</li>
      <li class="point measure" style="margin:0px 5px;" @click="_measureDistance(map,id)">{{isMeasure?'取消测量':'测量距离'}}</li>
      <li class="point" style="margin:0px 5px;" @click="_playback(map)">{{isPlayback?'停止回放':'回放轨迹'}}</li>
      <li class="point" style="margin:0px 5px;">功能4敬请期待</li>
      <li class="point" style="margin:0px 5px;">功能5敬请期待</li>
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
