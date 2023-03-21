<template>
  <div style="padding-top: 20px">
    <el-input v-model="search" size="small" placeholder="请输入搜索内容" style="width: 200px;height: 34px;margin: 10px"/>
    <el-button type="success" @click="newUser">新增</el-button>
    <el-popconfirm
        width="220"
        confirm-button-text="确认删除"
        cancel-button-text="我再考虑一下"
        :icon="InfoFilled"
        icon-color="#626AEF"
        title="确认删除吗">
      <template #reference>
        <el-button type="danger" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-popconfirm>

    <el-table
        :data="tableData"
        style="margin-top: 10px;padding-bottom: 50px;"
        ref="multipleTableRef"
        height="600"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="100" show-overflow-tooltip/>
      <el-table-column prop="myId" label="发送方ID" width="100" show-overflow-tooltip/>
      <el-table-column prop="youId" label="接收方ID" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="state" label="状态"  width="60"  show-overflow-tooltip>
        <template #default="scope">
          {{scope.row.state==0?"未读":"已读"}}
        </template>
      </el-table-column>
      <el-table-column prop="content" label="订单内容"  width="300"  show-overflow-tooltip/>
      <el-table-column prop="createTime" label="创建时间"  width="400"  show-overflow-tooltip/>

      <el-table-column fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="消息">
      <el-form :model="formData">
        <el-form-item label="发起方ID" style="float: left" :label-width="formLabelWidth">
          <el-input v-model="formData.myId" style="width: 190px" autocomplete="off" />
        </el-form-item>

        <el-form-item label="接收方ID" :label-width="formLabelWidth">
          <el-input v-model="formData.youId" style="width: 190px" autocomplete="off" />
        </el-form-item>

        <el-form-item label="消息内容" :label-width="formLabelWidth">
          <textarea placeholder="请输入咨询内容" v-model="formData.content" style="width: 96%;height: 140px"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
    <div style="position: fixed;bottom: 0;padding-bottom: 15px;background: #fff;width: 100%;z-index: 20">
      <el-pagination background layout="prev, pager, next" :total="16"/>
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted} from "vue";

const search=ref();
const dialogFormVisible = ref(false)
const multipleTableRef = ref()
const formLabelWidth=ref("140px")

var tableData = ref([])

var formData=ref();

const newUser = () => {
  formData.value={}

  dialogFormVisible.value = true

}

onMounted(()=>{
  for (let i = 0; i < 10; i++) {
    tableData.value.push({
      id:"oAcYV423q8wXMsBGpeFcGSc67PcM",
      myId:"oAcYV423q8wXMsBGpeFcGSc67PcM",
      youId:"oAcYV423q8wXMsBGpeFcGSc67PcM",
      state: 0,
      content:"肯定是副科级奥拉夫金卡价阿坎吉蜗牛",
      createTime: '2022-08-22 11:42:01'
    })
  }
})

const handleEdit=(index)=>{
  formData.value={...tableData.value[index]}

  dialogFormVisible.value = true

}

const handleSelectionChange = (val) => {
  console.log("val:"+JSON.stringify(val))
  // multipleSelection.value = val
}

</script>


<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<script setup>
import {ref,onMounted} from "vue";

const search=ref();
const dialogFormVisible = ref(false)
const multipleTableRef = ref()
const formLabelWidth=ref("140px")


var tableData = ref([])

var formData=ref();

const newUser = () => {
  formData.value={}

  dialogFormVisible.value = true

}

onMounted(()=>{
  for (let i = 0; i < 10; i++) {
    tableData.value.push({
      id:"oAcYV423q8wXMsBGpeFcGSc67PcM",
      userId:"oAcYV423q8wXMsBGpeFcGSc67PcM",
      lawyerId:"oAcYV423q8wXMsBGpeFcGSc67PcM",
      rate: 4,
      text:"肯定是副科级奥拉夫金卡价阿坎吉蜗牛",
      createTime: '2022-08-22 11:42:01'
    })
  }
})

const handleEdit=(index)=>{
  formData.value={...tableData.value[index]}

  dialogFormVisible.value = true

}

const handleSelectionChange = (val) => {
  console.log("val:"+JSON.stringify(val))
  // multipleSelection.value = val
}

</script>


<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>