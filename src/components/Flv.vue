<template>
  <div>
    <video id="videoElement" controls autoplay></video>
   <el-button type="primary" @click="getVideo()">开启直播</el-button>
  </div>
</template>
<script>
import flvjs from "flv.js"
export default{
  name:'Flv',
  methods:{
     getVideo(){
	     let videoElement = document.getElementById('videoElement');
       let flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: 'http://video.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    },
  }
}
</script>
<style scoped>
#videoElement{
  width:600px;
  height:450px;
}
</style>
