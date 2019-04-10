<template>
  <el-container>
    <el-aside width="200px">
      <el-tree
      ref="areaTree"
      check-strictly
      :data="treeAreaInfo"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
      empty-text="请首先添加根区域">
    </el-tree></el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
    import {areaTree} from "../../../api/api";

    export default {
        name: "placeManager",
      data(){
        return {
          treeAreaInfo: []
        };
      },
      methods: {
        handleNodeClick(data) {
          console.log(data);
        }
      },
      created() {
        let RootPlaceId = 1;
        let info = [];
        areaTree(RootPlaceId).then(res => {
          if (res.data.code !== 0) {
            this.$message({
              type: 'error',
              message: '服务异常，获取根区域树失败' + res.data.msg
            });
          } else {
            info.push(res.data.data);
            this.treeAreaInfo = info
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '服务异常，获取根区域树失败:' + err
          })
        });
      },
    }
</script>

<style scoped>

</style>
