<template>
  <div id="Flex">
    <div class="header">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
    <div class="bottom">
       <div class="leftMenu">左边菜单</div>
       <div class="content">
        <ol>
        	<li> flex-flow:flex-direction || flex-wrap的缩写，这个属性很灵活，你可以只写一个属性，也可以两个都写，甚至交换前后顺序都是可以的</li>
          <li>flex-direction:分别为row（默认值 从左往右）、row-reverse（从右往左）、column（从上往下）、column-reverse（从下往上）
注意：flex-direction并不是直接改变flex items的排列顺序，他只是通过改变了主轴方向间接的改变了顺序</li>
          <li>flex-wrap:能够决定flex items是在单行还是多行显示nowrap（默认）：单行 wrap：多行 wrap-reverse：多行（对比wrap，cross start与cross end相反），这个方法可以让交叉轴起点和终点相反，这样整体的布局就会翻转过来</li>
          <li>justify-content:justify-content决定了flex items在主轴上的对齐方式，总共有6个属性值：flex-start（默认值）：在主轴方向上与main start对齐flex-end：在主轴方向上与main end对齐center：在主轴方向上居中对齐space-between  space-evenly  space-around</li>
         <li><a href="https://juejin.cn/post/7033420158685151262">更多精彩</a></li>
        </ol>
       </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'Flex'
  }
</script>

<style lang="less" scoped>
 #Flex{
   display:flex;
   flex-direction:column; //垂直  column 上下对齐    row左右对齐
   background-color: #ff007f;
   height:calc(~"100% - 24px");
   .header{
     background-color: #00aaff;
     height:70px;
   }
   .bottom{
     background-color: #ffaa00;
     display: flex;
     height: 100%;
     .leftMenu{
       background-color: #ff00ff;
       width:100px;
     }
     .content{
       background-color: #55aa00;
       width:calc(~"100% - 100px");
       li{
         text-align:left;
       }
     }
   }
   ul{
     list-style:none;
     display:flex;
     height:100%;
     padding:0px;
     margin:0px;
     justify-content: flex-end;
     li{
         width:90px;
         // flex-grow:1;  //填充一行中剩下
         line-height:100%;
         background-color: #aa557f;
     }
   }
 }
</style>
