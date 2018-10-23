<template>
  <el-dialog title="修改区域" :visible.sync="dialogUpdateVisible">
    <el-form :model="form">
      <el-form-item label="区域/单位名称" :label-width="formLabelWidth">
        <el-input v-model="form.areaName" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-on:click="updateAreaCancel">取 消</el-button>
      <el-button type="primary"  v-on:click="updateArea">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {updateArea} from "../../../../api/api";

    export default {
      name: "updateArea",
      props: ["dialogUpdateVisible","nodeId"],
      data() {
        return {
          form: {
            areaName: "",
            delivery: false,
          },
          formLabelWidth: '120px'

        };
      },
      methods:{
        updateAreaCancel(){
          this.$emit("updateEvent");
        },
        updateArea  () {
          /*准备数据*/
          let updateAreaReq =
            {
              areaName: this.form.areaName
            };
          //请求修改
          updateArea(this.nodeId,updateAreaReq).then(res => {
            if (res.data.code !== 0) {
              this.$message({
                type: 'error',
                message: '修改失败' + res.data.msg
              });
            } else {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              //设置成功状态
              this.$emit("successUpdate",this.nodeId,this.form.areaName);
              //设置dialog隐藏
              this.$emit("updateEvent");
            }
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '添加失败' + err
            })
          })
        },
      }
    }
</script>

<style scoped>

</style>
