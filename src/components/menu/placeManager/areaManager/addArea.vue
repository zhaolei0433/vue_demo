<template>
      <el-dialog title="添加区域" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="区域/单位名称" :label-width="formLabelWidth">
            <el-input v-model="form.areaName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否为单位" :label-width="formLabelWidth">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-on:click="addAreaCancel">取 消</el-button>
          <el-button type="primary"  v-on:click="addAreaSubmit">确 定</el-button>
        </div>
      </el-dialog>
</template>

<script>
    import {addArea} from "../../../../api/api";

    export default {
      name: "addArea",
      props: ["dialogFormVisible","parentId"],
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
        addAreaCancel(){
          this.$emit("event");
        },
        addAreaSubmit() {
          /*准备数据*/
          let isCompany = this.form.delivery ? 1:0;
          let addAreaReq =
            {
              parentId: this.parentId,
              isCompany: isCompany,
              areaName: this.form.areaName
            };
          //请求添加
          addArea(addAreaReq).then(res => {
            if (res.data.code !== 0) {
              this.$message({
                type: 'error',
                message: '添加失败' + res.data.msg
              });
            } else {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              //设置成功状态
              this.$emit("successAdd",res.data.data.id,res.data.data.areaName);
              //设置dialog隐藏
              this.$emit("event");
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
