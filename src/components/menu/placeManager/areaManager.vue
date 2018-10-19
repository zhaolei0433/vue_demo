<template>
  <div>
    <!--    <div>区域管理</div>-->
    <el-container>
      <el-header class="areaManagerHeader">
        <el-row>
          <el-button type="primary" v-on:click="addAreaDialog">添加区域</el-button>
          <el-button type="primary" v-on:click="deleteArea">删除区域</el-button>
          <el-button type="primary" v-on:click="updateArea">修改区域</el-button>
          <add-area-ly :parent-id=this.parentId
                       :dialog-form-visible=this.dialogFormVisible
                       @event="dialogChange"
                       @successAdd="addAreaSuccess"/>
        </el-row>
      </el-header>
      <el-main>
        <el-tree
          ref="areaTree"
          show-checkbox
          check-strictly
          :data="treeAreaInfo"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
          empty-text="请首先添加根区域">
        </el-tree>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {areaTree} from "../../../api/api";
  import AddAreaLy from '../placeManager/areaManager/addArea'

  export default {
    name: "areaManager",
    components: {
      AddAreaLy,
    },
    data() {
      return {
        dialogFormVisible: false,
        parentId: 0,
        treeAreaInfo: [],
        defaultProps: {
          id: 'id',
          label: 'label',
          children: 'children'
        },
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      addAreaDialog() {
        if (this.treeAreaInfo !== null && this.$refs.areaTree.getCheckedNodes().length !== 1) {
          this.$message({
            type: 'warning',
            message: "请选择一个区域进行添加"
          });
        } else {
          this.dialogFormVisible = true;
          this.parentId = this.$refs.areaTree.getCheckedNodes()[0].id;
        }
      },
      dialogChange() {
        this.dialogFormVisible = false;
      },
      addAreaSuccess(id, areaName) {
        let areaInfo = {"id": id, "label": areaName, "children": null};
        this.jsonAdd(this.treeAreaInfo,areaInfo)
      },
      jsonAdd(jsonTree,areaInfo){
        for (let i = 0; i < jsonTree.length; i++) {
          if (jsonTree[i].id === this.parentId) {
            jsonTree[i].children.push(areaInfo);
            return;
          }
          if (jsonTree[i].children && jsonTree[i].children.length > 0) {
            this.jsonAdd(jsonTree[i].children,areaInfo);
          }
        }
      },
      deleteArea() {
        if (this.treeAreaInfo !== null && this.$refs.areaTree.getCheckedNodes().length === 0) {
          this.$message({
            type: 'warning',
            message: "请选择区域进行删除"
          });
        } else {
          for (let i = 0; i < this.$refs.areaTree.getCheckedNodes().length; i++){
            let node = this.$refs.areaTree.getCheckedNodes()[i];
            //服务器删除
            //界面删除
            console.log(JSON.stringify(node));
            this.jsonDelete(this.treeAreaInfo,node);
          }
        }
      },
      jsonDelete(jsonTree,areaInfo){
        for (let i = 0; i < jsonTree.length; i++) {
          if(jsonTree[i].children.length !== null){
            for (let j = 0; j < jsonTree[i].children.length; j++){
              if (jsonTree[i].children[j].id === areaInfo.id){
                jsonTree[i].children.splice(j,1);
              }
            }
          }
          if (jsonTree[i].children && jsonTree[i].children.length !== null && jsonTree[i].children.length > 0) {
            this.jsonDelete(jsonTree[i].children,areaInfo);
          }
        }
      },
      updateArea() {

      },
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
  };
</script>


<style scoped>

</style>
