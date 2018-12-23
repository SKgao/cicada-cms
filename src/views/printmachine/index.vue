<template>
  <div class="app-container">
    <dl class="ldl-list-search">
      <dt><i>添加打印机</i></dt>
      <dd>
        <el-form ref="formAdd" :model="formAdd" :rules="formAddRule" width="100%" label-position="left" style="margin-top:10px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="编号:" label-width="90px" prop="machineCode">
                <el-input v-model="formAdd.machineCode" placeholder="请输入打印机编号" size="medium" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="密钥:" label-width="90px" prop="machineKey">
                <el-input v-model="formAdd.machineKey" placeholder="请输入打印机密钥" size="medium"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="类型:" label-width="90px" prop="printMachineType">
                <el-select v-model="formAdd.printMachineType" placeholder="请选择打印机类型">
                  <el-option v-for="item in typeOptions" :key="item.value" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8" :offset="16" style="text-align:right">
              <el-button type="primary" size="medium" @click="formAddSubmit()">添加</el-button>
              <el-button type="" size="medium" @click="formAddReset">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </dd>
    </dl>

    <dl class="ldl-list-search">
      <dt> <i/>打印机列表</dt>
      <dd>
        <el-table
          v-loading="listLoading"
          :data="tableData"
          border
          style="width: 100%"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 1)">
          <el-table-column :index="indexMethod" type="index" label="ID" width="50"/>
          <el-table-column label="打印机编号" prop="machineCode" />
          <el-table-column label="打印机密钥" prop="machineKey" />
          <el-table-column label="打印机类型">
            <template slot-scope="scope">
              <span v-for="(item, index) in typeOptions" :key="index">
                <span v-if="scope.row.printMachineType == item.value">{{ item.name }}</span>
              </span>
            </template>
          </el-table-column>

          <el-table-column label="打印机状态" width="120px">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 'normal'">正常</el-tag>
              <el-tag v-else type="danger">异常</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="170px">
            <template slot-scope="scope">
              <div> {{ scope.row.createDate | dateFormat }}</div>
            </template>
          </el-table-column>
          <!--<el-table-column label="更新时间" width="170px">-->
          <!--<template slot-scope="scope">-->
          <!--<div v-if=" scope.row.updateDate"> {{ scope.row.updateDate | dateFormat }}</div>-->
          <!--<div v-else>-</div>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="操作" fixed="right" width="190px" >
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteMachine(scope.row.id)">删除</el-button>
              <el-button size="mini" type="success" @click="printMachine(scope.row.id)">测试</el-button>
            </template>
          </el-table-column>
        </el-table>
      </dd>
    </dl>

  </div>
</template>

<script>
import { printTypeOptions } from '@/utils/options'
import { printmachineList, printmachineAdd, printmachineDelete, printmachinePrint } from '@/api/printMachine'

export default{
  name: 'IndexPrintmachine',
  components: { },
  data() {
    return {
      typeOptions: printTypeOptions,
      formAdd: {
        machineCode: null,
        machineKey: null,
        printMachineType: null
      },
      formAddRule: {
        machineCode: [{
          required: true,
          message: '请输入打印机编号',
          trigger: 'blur'
        }],
        machineKey: [{
          required: true,
          message: '请输入打印机密钥',
          trigger: 'blur'
        }],
        printMachineType: [{
          type: 'number',
          required: true,
          message: '请选择打印机类型',
          trigger: 'change'
        }]
      },
      tableData: [],
      listLoading: true
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    formAddSubmit() {

      this.$refs.formAdd.validate(val => {
        if (val) {
          this.listLoading = true
          const submitMachineType = this.typeOptions.filter((item) => item.id === this.formAdd.printMachineType)

          printmachineAdd({
            'machineCode': this.formAdd.machineCode,
            'machineKey': this.formAdd.machineKey,
            'printMachineType': submitMachineType[0].value
          }).then(response => {
            this.$message({
              message: '恭喜你，新增打印机成功',
              type: 'success'
            })
            this.listLoading = true
            this.fetchList()
          })
        }
      })
    },
    formAddReset() {
      this.listLoading = true
      this.$refs['formAdd'].resetFields()
      this.fetchList()
    },
    fetchList() {
      printmachineList({}).then(response => {
        const result = response.data
        this.listLoading = false
        this.tableData = result.data
      }).catch(() => {
        this.listLoading = false
        this.$message.error('错了哦，新增打印机失败')
      })
    },
    deleteMachine(id) {
      printmachineDelete({
        'id': id
      }).then(response => {
        const result = response.data
        if (result.message === 'success') {
          this.$message({
            message: '删除打印机成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除打印机失败' + result.message)
        }
        this.listLoading = true
        this.fetchList()
      })
    },
    printMachine(id) {
      printmachinePrint({
        'id': id
      }).then(response => {
        const result = response.data
        if (result.message === 'success') {
          this.$message({
            message: '测试打印成功',
            type: 'success'
          })
        } else {
          this.$message.error('测试打印失败' + result.message)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../sass/common.scss";

  .app-container {
    padding: 20px 0

  }
</style>

