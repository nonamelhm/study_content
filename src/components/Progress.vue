<template>
  <div>
    <el-progress :percentage="percentage" :format="format" style="width:500px;margin: 0 auto"></el-progress>
  </div>
</template>

<script>
  export default {
    name: 'Progress',
    data(){
      return {
        percentage: 0,
        total:60,
        current:1,
        timer: null
      }
    },
    mounted(){
      this.timer = setInterval(()=>{
         if(this.percentage < 100){
           this.percentage = Math.floor((this.current / this.total)* 100)
           this.current = this.current + 1
         }else{
           clearInterval(this.timer)
         }
      },1000)
    },
    beforeDestroy(){
      if(this.timer){
        clearInterval(this.timer)
      }
    },
    methods: {
      format(percentage) {
        return percentage === 100 ? '播放完毕' : `当前时长：${this.current} 总时长：${this.total}`;
      },
    }
  }
</script>

<style>
</style>
