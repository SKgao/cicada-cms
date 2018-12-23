<template>
  <div class="app-container">
    <dl class="ldl-list-search">
      <dt><i>店铺筛选</i></dt>
      <dd>
        <el-form ref="formSearch" :model="formSearch" width="100%" label-position="left" style="margin-top:10px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="编号:" label-width="90px">
                <el-input v-model="formSearch.id" placeholder="请输入编号" size="medium" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="店铺名:" label-width="90px">
                <el-input v-model="formSearch.name" placeholder="请输入店铺名" size="medium"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态:" label-width="90px">
                <el-select v-model="formSearch.state" placeholder="请选择绑定状态">
                  <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建日期:" label-width="90px">
                <el-date-picker v-model="formSearch.createDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%;"/>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8" style="text-align:right">
              <el-button type="primary" size="medium" @click="formSearchSubmit('formSearch')">查询</el-button>
              <el-button type="" size="medium" @click="formSearchReset">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </dd>
    </dl>
    <dl class="ldl-list-search">
      <dt><el-button type="warning" size="mini" style="float: right;margin: 12px 0 0;" @click="addShop()">新增店铺</el-button> <i>店铺筛选结果</i></dt>
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
          <el-table-column label="店铺ID" prop="id" width="80"/>
          <el-table-column label="店铺名" prop="restaurantName"/>
          <el-table-column label="联系电话" prop="phone"/>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <div> {{ scope.row.createDate | dateFormat }}</div>
            </template>
          </el-table-column>
          <el-table-column label="绑定状态" prop="partners"/>
          <el-table-column label="操作" fixed="right" width="90px">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="detailEvent(scope.row.id)"> 详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-row>
          <el-col v-if="!listLoading" :span="24" class="pageTool">
            <el-pagination
              :current-page.sync="currentPage"
              :page-size="pageSize"
              :total="total"
              background
              layout="total,prev, pager, next, jumper"
              @current-change="handleCurrentChange"/>
          </el-col>
        </el-row>

        <!-- 新增店铺 -->
        <el-dialog :visible.sync="addShopPopShow" :before-close="closeAddPopEvent" title="新增店铺" width="600px" append-to-body custom-class="redStyle">
          <el-form ref="addShopForm" :model="addShopForm" :rules="addShopFormRule">
            <!--<el-form-item label="店铺ID" label-width="120px" prop="shopId">-->
            <!--<el-input v-model="addShopForm.shopId"/>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="线上店铺名称" label-width="120px" prop="onlineName">-->
            <!--<el-input v-model="addShopForm.onlineName"/>-->
            <!--</el-form-item>-->
            <el-form-item label="线下店铺名称" label-width="120px" prop="offlineName">
              <el-input v-model="addShopForm.offlineName"/>
            </el-form-item>
            <el-form-item label="打印机" label-width="120px" prop="printMachineId">
              <el-select v-model="addShopForm.printMachineId" placeholder="请选择打印机">
                <el-option v-for="item in addShop_printMacineOptions" :key="item.id" :label="item.machineCode" :value="Number(item.id)"/>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="市场经理" label-width="120px" prop="mangerName">-->
            <!--<el-input v-model="addShopForm.mangerName"/>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="市场经理电话" label-width="120px" prop="mangerTel">-->
            <!--<el-input v-model="addShopForm.mangerTel"/>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="店铺电话" label-width="120px" prop="shopTel">-->
            <!--<el-input v-model="addShopForm.shopTel"/>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="备注" label-width="120px">-->
            <!--<el-input v-model="addShopForm.note" type="textarea"/>-->
            <!--</el-form-item>-->

            <el-form-item label="商户联" label-width="120px" prop="printCountA">
              <el-select v-model="addShopForm.printCountA" placeholder="请选择商户联">
                <el-option v-for="item in addShop_printOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="顾客联" label-width="120px" prop="printCountB">
              <el-select v-model="addShopForm.printCountB" placeholder="请选择商户联">
                <el-option v-for="item in addShop_printOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="后厨联" label-width="120px" prop="printCountC">
              <el-select v-model="addShopForm.printCountC" placeholder="请选择商户联">
                <el-option v-for="item in addShop_printOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="分单商户结账联" label-width="120px" prop="printCountD">
              <el-select v-model="addShopForm.printCountD" placeholder="请选择商户联">
                <el-option v-for="item in addShop_printOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeAddPopEvent">取 消</el-button>
            <el-button type="primary" @click="submitAddPopEvent">确 定</el-button>
          </div>
        </el-dialog>
      </dd>
    </dl>

  </div>
</template>

<script>
import { fetchMerchantsByPage, addShop } from '@/api/restaurant'
import { printmachineList } from '@/api/printMachine'


export default{
  name: 'ListShop',
  components: { },
  data() {
    return {
      formSearch: {
        id: null,
        name: '',
        state: null, // (全部 null 1正常 0禁用)
        createDate: null
      },
      stateOptions: [
        {
          label: '全部',
          value: null
        },
        {
          label: '正常',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ],
      tableData: [],
      listLoading: true,
      start: 0, // 分页开始行
      currentPage: 1,
      pageSize: 10,
      total: null,
      addShopPopShow: false,
      addShop_printMacineOptions: [],
      addShop_printOptions: [{
        label: '0',
        value: 0
      },
      {
        label: '1',
        value: 1
      },
      {
        label: '2',
        value: 2
      }],
      addShopForm: {
        // shopId: null,
        // onlineName: '',
        // offlineName: '',
        printMachineId: null,
        printCountA: 1,
        printCountB: 0,
        printCountC: 0,
        printCountD: 0
        // note: ''
      },
      addShopFormRule: {

        // shopId: [{
        //   required: true,
        //   message: '请输入店铺Id',
        //   trigger: 'blur'
        // }, {
        //   required: true,
        //   pattern: /^[1-9]\d*(\.\d+)?$|^0\.\d+$/, // 大于0的数字且首字母不能为0
        //   message: '店铺Id为大于0的数字且首字母不能为0',
        //   trigger: 'blur'
        // }],
        // onlineName: [{
        //   required: true,
        //   message: '请输入线上店铺名称',
        //   trigger: 'blur'
        // },
        // {
        //   min: 2,
        //   max: 80,
        //   message: '长度在 2 到 80 个字符',
        //   trigger: 'blur'
        // }],
        offlineName: [{
          required: true,
          message: '请输入线下店铺名称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 80,
          message: '长度在 2 到 80 个字符',
          trigger: 'blur'
        }],
        printMachineId: [{
          type: 'number',
          required: true,
          message: '请选择打印机',
          trigger: 'change'
        }],
        // printMachineId: [{ //这里不是input框来展示了，用下拉选项来替换了，备注此验证写法
        //   required: true,
        //   message: '请输入打印机ID',
        //   trigger: 'blur'
        // }, {
        //   required: true,
        //   pattern: /^[1-9]\d*(\.\d+)?$|^0\.\d+$/, // 大于0的数字且首字母不能为0
        //   message: '请输入正确的打印机ID，需为数字',
        //   trigger: 'blur'
        // }],
        // mangerName: [{
        //   required: true,
        //   message: '请输入市场经理',
        //   trigger: 'blur'
        // }],
        // mangerTel: [{
        //   required: true,
        //   message: '请输入市场经理电话',
        //   trigger: 'blur'
        // }, {
        //   pattern: /^0\d{2,3}-?\d{7,8}$|^1\d{10}$/,
        //   message: '号码格式不正确，请输入座机或手机号',
        //   trigger: 'blur'
        // }],
        // shopTel: [{
        //   required: true,
        //   message: '请输入店铺电话',
        //   trigger: 'blur'
        // }, {
        //   pattern: /^0\d{2,3}-?\d{7,8}$|^1\d{10}$/,
        //   message: '号码格式不正确，请输入座机或手机号',
        //   trigger: 'blur'
        // }]
        printCountA: [{
          type: 'number',
          required: true,
          message: '请选择商户联',
          trigger: 'change'
        }],
        printCountB: [{
          type: 'number',
          required: true,
          message: '请选择顾客联',
          trigger: 'change'
        }],
        printCountC: [{
          type: 'number',
          required: true,
          message: '请选择后厨联',
          trigger: 'change'
        }],
        printCountD: [{
          type: 'number',
          required: true,
          message: '请选择分单商户结账联',
          trigger: 'change'
        }]

      }
    }
  },
  mounted() {
    this.fetchPageData()
    // 新增店铺的时候用，获取打印机
    printmachineList({}).then(response => {
      const result = response.data
      this.addShop_printMacineOptions = result.data
    }).catch((err) => {
      this.$message.error('错了哦，获取打印机信息失败，失败原因：' + err)
    })
  },
  methods: {
    formSearchSubmit() {
      this.start = 0
      this.currentPage = 1
      this.listLoading = true
      this.fetchPageData()
    },
    formSearchReset() {
      this.listLoading = true
      this.formSearch = {
        id: null,
        name: '',
        state: null,
        createDate: null
      }
      this.start = 0
      this.currentPage = 1
      this.total = 0
      this.fetchPageData()
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    detailEvent(id) {
      this.$router.push({
        path: '/shop/detail/' + id
      })
    },
    fetchPageData() {
      fetchMerchantsByPage({
        'pageNum': this.currentPage,
        'pageSize': this.pageSize
      }).then(response => {
        const result = response.data.data
        this.total = result.totalRows
        this.listLoading = false

        this.tableData = result.pageData
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val
      this.start = (val - 1) * this.pageSize
      this.listLoading = true
      this.fetchPageData()
    },
    addShop() {
      this.addShopPopShow = true

      printmachineList({}).then(response => {
        const result = response.data
        this.addShop_printMacineOptions = result.data
      }).catch((err) => {
        this.$message.error('错了哦，获取打印机信息失败，失败原因：' + err)
      })
    },
    closeAddPopEvent() {
      this.addShopPopShow = false
      this.addShopForm.note = ''
      this.$refs['addShopForm'].resetFields()
    },
    submitAddPopEvent() {
      this.$refs.addShopForm.validate(val => {
        if (val) {
          console.log(val)
          addShop({
            'printCountA': this.addShopForm.printCountA,
            'printCountB': this.addShopForm.printCountB,
            'printCountC': this.addShopForm.printCountC,
            'printCountD': this.addShopForm.printCountD,
            'printMachineId': this.addShopForm.printMachineId,
            'restaurantName': this.addShopForm.offlineName
          }).then(response => {
            this.$message({
              message: '恭喜你，新增店铺成功',
              type: 'success'
            })
            this.listLoading = true
            this.fetchPageData()
          })
          this.closeAddPopEvent()
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

