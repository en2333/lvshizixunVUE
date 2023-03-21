<template>
  <div style="padding-top: 20px">
    <el-input v-model="search" size="small" placeholder="请输入搜索内容" style="width: 200px;height: 34px;margin: 10px"/>
    <el-button type="success" @click="newUser">新增</el-button>
    <el-popconfirm
        width="220"
        confirm-button-text="确认删除"
        @confirm="delUser"
        cancel-button-text="我再考虑一下"
        :icon="InfoFilled"
        icon-color="#626AEF"
        title="确认删除吗">
      <template #reference>
        <el-button type="danger">删除</el-button>
      </template>
    </el-popconfirm>

    <el-table
        :data="tableData"
        style="margin-top: 10px;padding-bottom: 50px"
        ref="multipleTableRef"
        height="600"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="100" show-overflow-tooltip/>
      <el-table-column prop="name" label="用户名" width="180" show-overflow-tooltip/>
      <el-table-column prop="avatar" label="用户头像" width="120" show-overflow-tooltip>
        <template #default="scope">
          <el-popover
              placement="top-start"
              :width="200"
              trigger="hover">
            <template #reference>
              <el-image style="width: 40px; height: 40px;border-radius: 25px" :src=scope.row.avatar fit="fill" />
            </template>
            <el-image style="width: 200px; height: 200px" :src=scope.row.avatar fit="fill" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="用户身份" width="120" show-overflow-tooltip>
        <template #default="scope">
          {{scope.row.status==1?"律师":"普通用户"}}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" width="180" show-overflow-tooltip/>
      <el-table-column prop="createTime" label="注册时间" width="180" show-overflow-tooltip/>
      <el-table-column prop="modifyTime" label="上次登录时间"  width="180"  show-overflow-tooltip/>

      <el-table-column >
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="用户">
      <el-form :model="formData">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formData.name" style="width: 190px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上传头像" :label-width="formLabelWidth">
          <el-upload
              class="avatar-uploader"
              :action=$.gl.imageUploadPath
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
            <img v-if="formData.avatar" :src="formData.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>

        </el-form-item>
        <el-form-item label="用户身份" :label-width="formLabelWidth">
          <el-select v-model="formData.status" placeholder="选择用户身份">
            <el-option label="普通用户" :value=0 />
            <el-option label="律师" :value=1 />
          </el-select>
        </el-form-item>

        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="formData.address" style="width: 190px" autocomplete="off" />
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
      <el-pagination v-model:current-page="pageCurr" layout="prev, pager, next" :total="total" @current-change="loadUser"/>
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted,inject} from "vue";
import { Plus } from '@element-plus/icons-vue'

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
    $.re.get($.gl.serverPath+"/user/bgDelUser",{params:{
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
  $.re.post($.gl.serverPath+"/user/updateUser",{
    ...formData.value
  }).then(()=>{
    loadUser()
  })
}
const submitNewUser=()=>{
  $.re.post($.gl.serverPath+"/user/bgNewUser",{
    ...formData.value
  }).then(()=>{
    loadUser()
  })
}

const loadUser=()=>{
  $.re.get($.gl.serverPath+"/user/bgSelUser",{params:{
      search: search.value,
      pageCurr:pageCurr.value,
      pageSize:10
    }
  }).then(res=>{
    tableData.value=res.data.records
    total.value=res.data.total
  })
}

const handleAvatarSuccess = (res)=>{
  formData.value.avatar=$.gl.imagePath+res.data;
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