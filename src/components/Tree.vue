<template>
  <div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <i :class="data.url"></i>
        <span @click="()=>click1(node,data)">{{ data.name }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [{
          name: '所有渔港 1',
          fishingPort: [{
            name: '渔港 1-1',
            fishingPort: [{
              name: '国库船 1-1-1',
              url:'q'
            }]
          }]
        }, {
          name: '所有渔港 2',
          fishingPort: [{
            name: '渔港 2-1',
            fishingPort: [{
              name: '国库船 2-1-1',
               url:'q'
            }]
          }, {
            name: '渔港 2-2',
            fishingPort: [{
              name: '国库船 2-2-1',
               url:'q'
            }]
          }]
        }, {
          name: '所有渔港 3',
          fishingPort: [{
            name: '渔港 3-1',
            fishingPort: [{
              name: '国库船 3-1-1',
               url:'q'
            }]
          }, {
            name: '渔港 3-2',
            fishingPort: [{
              name: '国库船 3-2-1',
               url:'q'
            }]
          }]
        }],
        defaultProps: {
          children: 'fishingPort',
          label: 'name'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
     click1(node,data){
       console.log("点击了click1")
       console.log(data)
       // 判断是渔船点击
       if(data.url){
         alert("点击了渔船")
       }
     },
     click2(node,data){
       console.log("点击了click2")
       console.log(node,data)
     }
    }
  }
</script>

<style scoped>
  .el-tree {
    width: 30%;
  }
  .q{
    width:20px;
    height:20px;
    margin-top: 5px;
    line-height: 19px;
    margin-right: 2px;
    background-color:pink;
    display: inline-block;
  }
</style>
