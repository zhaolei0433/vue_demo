<template>
  <div>
    <div>区域管理</div>
    <el-tree
      :data="treeAreaInfo"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
  import {AreaTree} from "../../../api/api";

  export default {
    name: "areaManager",
    data() {
      return {
        treeAreaInfo: [],
        defaultProps: {
          id: 'id',
          label: 'label',
          children: 'children'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    },
    created() {
      let RootPlaceId = 1;
      let data1 = [];
      AreaTree(RootPlaceId).then(res =>{
        if (res.data.code !== 0) {
          this.$message({
            type: 'error',
            message: '服务异常，获取根区域树失败' + res.data.msg
          });
        } else {
          data1.push(res.data.data) ;
          this.treeAreaInfo = data1
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '获取根区域树失败:' + err
        })
      });
    }
  };
</script>


<style scoped>

</style>
