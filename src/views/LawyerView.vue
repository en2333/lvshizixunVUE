<template>
  <div style="padding-top: 20px;">
    <el-input v-model="search" size="small" placeholder="请输入搜索内容" style="width: 200px;height: 34px;margin: 10px"/>
    <el-button type="success" @click="newUser">新增</el-button>
    <el-popconfirm
        width="220"
        confirm-button-text="确认删除"
        cancel-button-text="我再考虑一下"
        :icon="InfoFilled"
        icon-color="#626AEF"
        @confirm="delLawyer"
        title="确认删除吗">
      <template #reference>
        <el-button type="danger">删除</el-button>
      </template>
    </el-popconfirm>

    <el-table
        :data="tableData"
        ref="multipleTableRef"
        height="600"
        @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="id" label="ID" width="100" show-overflow-tooltip/>
      <el-table-column fixed prop="name" label="律师姓名" width="80" show-overflow-tooltip/>
      <el-table-column prop="avatar" label="律师头像" width="80" show-overflow-tooltip>
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
      <el-table-column prop="address" label="地址" width="180" show-overflow-tooltip/>
      <el-table-column prop="goodAt" label="擅长领域" width="120" show-overflow-tooltip>
        <template #default="scope">
          <el-text v-bind:key="item" v-for="item in scope.row.goodAt">
            {{goodAts[item]}}&nbsp;
          </el-text>
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="评分" width="60" show-overflow-tooltip/>
      <el-table-column prop="sex" label="性别" width="60" show-overflow-tooltip>
        <template #default="scope">
          {{scope.row.sex==1?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column prop="enterTime" label="入行时间" width="120" show-overflow-tooltip/>
      <el-table-column prop="phone" label="手机号码" width="120" show-overflow-tooltip/>
      <el-table-column prop="phonePrice" label="电话咨询价格" width="60" show-overflow-tooltip/>
      <el-table-column prop="imgTxtPrice" label="图文咨询价格" width="60" show-overflow-tooltip/>
      <el-table-column prop="oftenCourts" label="常去法院" width="120" show-overflow-tooltip/>
      <el-table-column prop="identNum" label="执照证号" width="120" show-overflow-tooltip/>
      <el-table-column prop="company" label="律所名称" width="120" show-overflow-tooltip/>
      <el-table-column prop="introduce" label="个人介绍" width="120" show-overflow-tooltip/>
      <el-table-column prop="state" label="审核状态" width="80" show-overflow-tooltip>
        <template #default="scope">

        <el-tooltip :content='(scope.row.state==1?"通过":"未通过")' placement="top">
          <el-switch
              v-model="scope.row.state"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              :active-value=1
              :inactive-value=0
              @change="bgUpdLawState(scope.row.id)"
          />
        </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间" width="180" show-overflow-tooltip/>
      <el-table-column prop="modifyTime" label="上次登录时间"  width="180"  show-overflow-tooltip/>

      <el-table-column fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="律师">
      <el-form :model="formData">
        <el-form-item label="律师名" style="float: left" :label-width="formLabelWidth">
          <el-input v-model="formData.name" style="width: 190px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="formData.address" style="width: 190px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="擅长领域" style="float: left" :label-width="formLabelWidth">
          <el-select
              v-model="formData.goodAt"
              multiple
              collapse-tags
              placeholder="Select"
              style="width: 190px"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-input-number min="1" max="5" v-model="formData.rate" class="mx-4" />
        </el-form-item>
        <el-form-item label="入行时间" style="float: left" :label-width="formLabelWidth">
          <el-date-picker
              v-model="formData.enterTime"
              type="date"
              placeholder="Pick a date"
              :default-value="new Date(2010, 9, 1)"
          />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-tooltip :content='(formData.sex==1?"男":"女")' placement="top">
            <el-switch
                v-model="formData.sex"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                :active-value=1
                :inactive-value=0
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="手机号码" style="float: left" :label-width="formLabelWidth">
          <el-input v-model="formData.phone" style="width: 190px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话咨询价格" :label-width="formLabelWidth">
          <el-input v-model="formData.phonePrice" style="width: 190px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图文咨询价格" style="float: left" :label-width="formLabelWidth">
          <el-input v-model="formData.imgTxtPrice" style="width: 190px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="常去法院" :label-width="formLabelWidth">
          <el-input v-model="formData.oftenCourts" style="width: 190px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="执照证号" style="float: left" :label-width="formLabelWidth">
          <el-input v-model="formData.identNum" style="width: 190px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="律所名称" :label-width="formLabelWidth">
          <el-input v-model="formData.company" style="width: 190px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="个人介绍" :label-width="formLabelWidth">
          <textarea placeholder="个人介绍限制在200字以内" v-model="formData.introduce" style="width: 96%;height: 140px">

          </textarea>
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
      <el-pagination v-model:current-page="pageCurr" layout="prev, pager, next" :total="total" @current-change="loadLawyer"/>
    </div>  </div>
</template>

<script setup>
import {ref,onMounted,inject} from "vue";

const $=inject('global')
const pageCurr=ref(1)
const total=ref();
const clickType=ref(0);//判断用户点击的是新增还是编辑按钮，0表示新增，1表示编辑
var selectUser=ref();

const goodAts=["生活纠纷","交通事故","经济纠纷","劳务纠纷","房产纠纷","合同问题","刑事辩护"]
const search=ref();
const dialogFormVisible = ref(false)
const multipleTableRef = ref()
const formLabelWidth=ref("140px")
const options =[
  {
    value: 0,
    label: '生活纠纷',
  },
  {
    value: 1,
    label: '交通事故',
  },
  {
    value: 2,
    label: '经济纠纷',
  },
  {
    value: 3,
    label: '劳务纠纷',
  },
  {
    value: 4,
    label: '房产纠纷',
  },
  {
    value: 5,
    label: '合同问题',
  },
  {
    value: 6,
    label: '刑事辩护',
  }
]
const tableData = ref([])
var formData=ref({});

onMounted(()=>{
  inputUpdate()
  loadLawyer()
})

const newUser = () => {
  clickType.value=0
  formData.value={}
  dialogFormVisible.value = true
}



const loadLawyer = ()=>{
  $.re.get($.gl.serverPath+"/lawyer/bgSelectLawyer",{params:{
      search: search.value,
      pageCurr:pageCurr.value,
      pageSize:10
    }
  }).then(res=>{
    tableData.value=res.data.records
    total.value=res.data.total
  })
}

const delLawyer=()=>{
  for (let i = 0; i < selectUser.value.length; i++) {
    $.re.get($.gl.serverPath+"/lawyer/bgDelLawyer",{params:{
        id: selectUser.value[i].id
      }
    }).then(()=>{
      loadLawyer()
    })
  }
}

const submit =()=>{
  dialogFormVisible.value = false
  try{
    formData.value.goodAt=formData.value.goodAt.toString()
  }catch (e){
    console.log(e)
  }
  try {
    formData.value.enterTime.setDate(formData.value.enterTime.getDate()+1)
  }catch (e){
    console.log(e)
  }
  try {
    formData.value.enterTime=JSON.stringify(formData.value.enterTime).split('T')[0].slice(1)
  }catch (e){
    console.log(e)
  }
  clickType.value==0?submitNewUser():updateLawyer()
}

const bgUpdLawState=(id)=>{
  $.re.get($.gl.serverPath+"/lawyer/bgUpdLawState",{params:{
      id: id
    }
  }).then(()=>{
    loadLawyer()
  })
}
const updateLawyer=()=>{
  $.re.post($.gl.serverPath+"/lawyer/bgUpdLawyer",{...formData.value}).then(()=>{
    loadLawyer()
  })
}
const submitNewUser=()=>{
  $.re.post($.gl.serverPath+"/lawyer/bgNewLawyer",{
    ...formData.value
  }).then(()=>{
    loadLawyer()
  })
}

const handleEdit=(index)=>{
  clickType.value=1
  let goodsToArray=[]
  tableData.value[index].goodAt.split(',').forEach((item,index)=>{
    goodsToArray[index]=parseInt(item)
  })

  formData.value={...tableData.value[index]}
  formData.value.goodAt=goodsToArray
  dialogFormVisible.value = true
}

const handleSelectionChange = (val) => {
  selectUser.value=val
}

const inputUpdate=()=>{    //input更新修正，汉语拼音不触发，打完后触发
  const textEle = document.querySelector('input');
  textEle.addEventListener('input', ()=>{
    loadLawyer()
  })
  textEle.addEventListener('compositionend', ()=>{
    loadLawyer()
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