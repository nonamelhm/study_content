<template>
  <div>
    <div class="drag-follow-box" id="drag-video-id">
      <div class="drag-top" @mousedown="draggableFun($event)">
        <img src="../assets/close.png" class="drag-close" @click="closeDragBox($event)">
        <span class="drag-device">
          {{deviceName}}
          <i class="member-status-icon info-status"></i>
        </span>
      </div>
      <div :id="dragPlayId" ref="video2" v-show="isPlay" class="drag-bottom" v-if="mainCamUrl != ''"></div>
    </div>
  </div>

</template>

<script>
  import FlvJsPlayer from 'xgplayer-flv.js';
  import Player from 'xgplayer';
  export default {
    name: "DragFlv",
    data() {
      return {
        isPlay: false,
        player: null,
        deviceName: '设备001',
        dragPlayId: 'liveId2',
        mainCamUrl: 'http://101.35.224.13:8866/live?url=rtsp://113.52.155.43:9090/dss/monitor/params?cameraid=1000000%240&substream=1?token=81'
      }
    },
    mounted() {
      this.getVideo()
    },
    methods: {
      getVideo() {
        let playUrl = this.mainCamUrl //播放地址
        this.initPlayer(playUrl)
      },
      // 设置视频配置(注意：initPlayer应放在异步函数里或mounted之后，不可在created里直接加载，否则不生效)
      initPlayer(url) {
        let _this = this
        var player = document.getElementById(this.dragPlayId);
        this.isPlay = true;
        console.log(this.dragPlayId)
        this.player = new FlvJsPlayer({
          id: _this.dragPlayId,
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
          errorTips: '<span class="app-error">无视频源</span>',
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
          }
        });
        console.log("this.player", this.player);
        this.player.once('complete', () => {
          console.log('complete') //以下这段我没成功。
          try {
            this.player.play() // 尝试再次执行播放
            setTimeout(() => { // 500毫秒后检测
              if (!this.player.hasStart && this.player.currentTime ===
                0) { // hasStart返回false，并且播放时间还是0，那么就可以认为自动播放失效了
                isAutoPlay = false;
              }
            }, 500)
          } catch (e) {
            console.log("hhhh")
            console.log(e);
          }
        })
      },
      draggableFun(ev) {
        console.log("点击")
        ev.preventDefault()
        let div = ev.target.parentNode
        let dragFlag = false;
        let x, y;
        div.onmousedown = function(e) {
          e.preventDefault()
          dragFlag = true;
          e = e || window.event;
          // 获取鼠标在元素上的位置（鼠标按下时在元素上得位置）
          x = e.clientX - div.offsetLeft;
          y = e.clientY - div.offsetTop;
          console.log(div.offsetLeft)
          console.log(div.offsetTop)
          console.log("-------------")
        };

        div.onmousemove = function(e) {
          e.preventDefault()
          if (dragFlag) {
            e = e || window.event;
            div.style.left = e.clientX - x + "px";
            div.style.top = e.clientY - y + "px";
          }
        };
        // 鼠标抬起事件
        div.onmouseup = function(e) {
          e.preventDefault()
          dragFlag = false;
        };
      },
      //关闭直播盒子
      closeDragBox(ev) {
        ev.target.parentNode.parentNode.remove()
        if (this.player) {
          this.player.destroy()
        }
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
  .drag-follow-box {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 400px;
    border: 1px solid rgb(226, 226, 226);
    position: absolute;
    z-index: 2001;
    top: 35%;
    left: 400px;
  }

  .drag-top {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgb(226, 226, 226);
    background: rgb(255, 255, 255);
    cursor: move;
  }

  .drag-bottom {
    flex: 1 1 0%;
    background: rgb(224, 224, 224);
    width: 100%;
    height: 100%;
    border: 0px;
  }

  .drag-close {
    float: right;
    margin: 12px;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  .drag-device {
    float: left;
    margin: 9px 9px 9px 30px;
  }

  .member-status-icon {
    display: block;
    width: 10px;
    height: 10px;
    min-width: 10px;
    border: 2px solid rgb(255, 255, 255);
    border-radius: 50%;
    position: absolute;
    left: 6px;
    top: 13px;
    background-color: rgb(159, 155, 155);
  }
</style>
