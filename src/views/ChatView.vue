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
        @confirm="delUser"
        title="确认删除吗">
      <template #reference>
        <el-button type="danger">删除</el-button>
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
        <el-button type="primary" @click="submit">
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
import {ref,onMounted,inject} from "vue";

const $ = inject('global')

const search=ref();
const clickType=ref(0);//判断用户点击的是新增还是编辑按钮，0表示新增，1表示编辑
const dialogFormVisible = ref(false)
const multipleTableRef = ref()
const formLabelWidth=ref("140px")

var tableData = ref([])
var total=ref()
var pageCurr = ref(1)
var formData=ref();
var selectUser=ref();
onMounted(()=>{
  inputUpdate()
  loadUser()
})

const delUser=()=>{
  for (let i = 0; i < selectUser.value.length; i++) {
    $.re.get($.gl.serverPath+"/chat/bgDelChat",{params:{
        id: selectUser.value[i].id
      }
    }).then(()=>{
      loadUser()
    })
  }
}
const newUser=()=>{
  clickType.value=0
  formData.value={}
  dialogFormVisible.value = true
}

const submit=()=>{
  if(clickType.value==0){
    submitNewUser()
  }else if(clickType.value==1){
    updateUser()
  }
  dialogFormVisible.value = false
}
const updateUser=()=>{
  $.re.post($.gl.serverPath+"/chat/bgUpdChat",{
    ...formData.value
  }).then(()=>{
    loadUser()
  })
}
const submitNewUser=()=>{
  $.re.post($.gl.serverPath+"/chat/bgNewChat",{
    ...formData.value
  }).then(()=>{
    loadUser()
  })
}

const loadUser=()=>{
  $.re.get($.gl.serverPath+"/chat/bgSelChat",{params:{
      search: search.value,
      pageCurr:pageCurr.value,
      pageSize:10
    }
  }).then(res=>{
    tableData.value=res.data.records
    total.value=res.data.total
  })
}


const handleEdit=(index)=>{
  clickType.value=1
  formData.value={...tableData.value[index]}
  dialogFormVisible.value = true
}

const handleSelectionChange = (val) => {
  selectUser.value=val
}

const inputUpdate=()=>{    //input更新修正，汉语拼音不触发，打完后触发
  const textEle = document.querySelector('input');
  textEle.addEventListener('input', ()=>{
    loadUser()
  })
  textEle.addEventListener('compositionend', ()=>{
    loadUser()
  })
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