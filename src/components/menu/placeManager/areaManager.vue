<template>
  <div>
    <!--    <div>区域管理</div>-->
    <el-container>
      <el-header class="areaManagerHeader">
        <el-row>
          <el-button type="primary" v-on:click="addAreaDialog">添加区域</el-button>
          <el-button type="primary" v-on:click="deleteArea">删除区域</el-button>
          <el-button type="primary" v-on:click="updateAreaDialog">修改区域</el-button>
          <add-area-ly :parent-id=this.parentId
                       :dialog-form-visible=this.dialogFormVisible
                       @event="dialogChange"
                       @successAdd="addAreaSuccess"/>
          <update-area-ly :node-id="this.nodeId"
                          :dialog-update-visible="this.dialogUpdateVisible"
                          @updateEvent="updateAreaCancel"
                          @successUpdate="updateAreaSuccess"/>
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
  import {areaTree, deleteArea} from "../../../api/api";
  import AddAreaLy from '../placeManager/areaManager/addArea';
  import UpdateAreaLy from '../placeManager/areaManager/updateArea';

  export default {
    name: "areaManager",
    components: {
      UpdateAreaLy,
      AddAreaLy,
    },
    data() {
      return {
        dialogFormVisible: false,
        dialogUpdateVisible: false,
        parentId: 0,
        nodeId:0,
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
          let nodes = this.$refs.areaTree.getCheckedNodes();
          for (let i = 0; i < nodes.length; i++){
            deleteArea(nodes[i].id).then( res => {
              if (res.data.code !== 0) {
                this.$message({
                  type: 'error',
                  message: '删除失败' + res.data.msg
                });
              } else {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                });
                //设置成功状态
                this.jsonDelete(this.treeAreaInfo,nodes[i]);
              }
            }).catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败' + err
              })
            });
          }
        }
      },
      jsonDelete(jsonTree,areaInfo) {
        for (let i = 0; i < jsonTree.length; i++ ) {
          if (jsonTree[i].children !== null && jsonTree[i].children.length > 0){
            for (let j = 0; j < jsonTree[i].children.length; j++) {
              if (jsonTree[i].children[j].id === areaInfo.id) {
                jsonTree[i].children.splice(j, 1);
              }
            }
          }
          if (jsonTree[i].children !== null && jsonTree[i].children.length > 0) {
            this.jsonDelete(jsonTree[i].children, areaInfo);
          }
        }
      },
      updateAreaDialog(){
        if (this.treeAreaInfo !== null && this.$refs.areaTree.getCheckedNodes().length !== 1) {
          this.$message({
            type: 'warning',
            message: "请选择一个区域进行修改"
          });
        } else {
          this.dialogUpdateVisible = true;
          this.nodeId = this.$refs.areaTree.getCheckedNodes()[0].id;
        }
      },
      updateAreaCancel(){
        this.dialogUpdateVisible = false;
      },
      updateAreaSuccess(id, areaName){
        let areaInfo = {"id": id, "label": areaName, "children": null};
        this.jsonUpdate(this.treeAreaInfo,areaInfo);
      },
      jsonUpdate(jsonTree,areaInfo){
        for (let i = 0; i < jsonTree.length; i++ ) {
          if (jsonTree[i].children !== null && jsonTree[i].children.length > 0){
            for (let j = 0; j < jsonTree[i].children.length; j++) {
              if (jsonTree[i].children[j].id === areaInfo.id) {
                areaInfo.children = jsonTree[i].children[j].children;
                jsonTree[i].children.splice(j, 1, areaInfo);
              }
            }
          }
          if (jsonTree[i].children !== null && jsonTree[i].children.length > 0) {
            this.jsonUpdate(jsonTree[i].children, areaInfo);
          }
        }
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
