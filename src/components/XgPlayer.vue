<!--xgplayer  -->
<template>
  <div class="cam" v-if="mainCamUrl != ''">
    <div class="video" v-show="isPlay" :id="camDOMid" ref="video"></div>
  </div>
</template>
<script>
  import FlvJsPlayer from 'xgplayer-flv.js';
  import Player from 'xgplayer';
  export default {
    name: "XgPlayer",
    data() {
      return {
        isPlay: false,
        player: null,
        camDOMid:'liveId',
        mainCamUrl:'http://101.35.224.13:8866/live?url=rtsp://113.52.155.43:9090/dss/monitor/params?cameraid=1000000%240&substream=1?token=81'
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      // 设置视频配置(注意：initPlayer应放在异步函数里或mounted之后，不可在created里直接加载，否则不生效)
      initPlayer(url) {
        console.log("this.camDOMid", this.camDOMid);
        var player = document.getElementById(this.camDOMid);
        this.isPlay = true;
        this.player = new FlvJsPlayer({
          id: this.camDOMid,
          url: url,
          fitVideoSize: 'auto',
          hasStart: true,
          autoplay: true, //自动播放，设置自动播放必要参数
          autoplayMuted: true, //自动播放静音，设置自动播放参数必要参数
          volume: 0,
          defaultMuted: true,
          isLive: true,
          playsinline: false,
          screenShot: true,
          fluid: true,
          aspectRatio: '16:9',
          whitelist: [''],
          ignores: ['time'],
          closeVideoClick: true,
          // errorTips: '<span class="app-error">无视频源</span>',
          customConfig: {
            isClickPlayBack: false
          },
          flvOptionalConfig: {
            enableWorker: true,
            enableStashBuffer: true, //启用缓存
            stashInitialSize: 4096, //缓存大小4m
            lazyLoad: false,
            lazyLoadMaxDuration: 40 * 60,
            autoCleanupSourceBuffer: true,
            autoCleanupMaxBackwardDuration: 35 * 60,
            autoCleanupMinBackwardDuration: 30 * 60
          } //flv.js可选配置项 [flv.js配置](https://github.com/bilibili/flv.js/blob/master/docs/api.md#config)
        });
        console.log("this.player", this.player);
        this.player.once('complete', () => {
          console.log('complete')//以下这段我没成功。
          try {
            this.player.play() // 尝试再次执行播放
            setTimeout(() => { // 500毫秒后检测
              if (!this.player.hasStart && this.player.currentTime ===
                0) { // hasStart返回false，并且播放时间还是0，那么就可以认为自动播放失效了
                isAutoPlay = false;
              }
            }, 500)
          } catch (e) {
            console.log(e);
          }
        })
      },
      getData() {
        let playUrl = this.mainCamUrl //播放地址
        this.initPlayer(playUrl)
      },
    },
    beforeDestroy() {
      if (this.player) {
        this.player.destroy();
      }
      console.log('销毁了');
	  },
  }
</script>

<style scoped>
  .cam {
    position: relative;
  }
  .video {
    width: 100%;
    height: 100%;
  }
</style>
