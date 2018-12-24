<template>
  <div class="app-container">
    <h1>{{ detailInfo.restaurant.restaurantName }}</h1>
    <div class="detail">
      <el-tabs>
        <el-tab-pane>
          <span slot="label">
            <span class="tabTitle">店铺信息</span>
          </span>
          <div class="tabCont">
            <el-form :model="detailInfo" label-width="180px" label-position="right">
              <el-row class="tabBorder">
                <el-col :span="12">
                  <el-form-item label="temp">
                    <span slot="label" class="tit">创建时间:</span>
                    <span class="formValue">{{ detailInfo.restaurant.createDate | dateFormat }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="temp">
                    <span slot="label" class="tit">变更时间:</span>
                    <span class="formValue">
                      <span
                        v-if="detailInfo.restaurant.createDate"
                      >{{ detailInfo.restaurant.createDate | dateFormat }}</span>
                      <span v-else>-</span>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="temp">
                    <span slot="label" class="tit">打印机编号:</span>
                    <span class="formValue">
                      <el-select
                        v-model="detailInfo.restaurant.printMachineId"
                        placeholder="请选择打印机"
                      >
                        <el-option
                          v-for="item in addShop_printMacineOptions"
                          :key="item.id"
                          :label="item.machineCode"
                          :value="Number(item.id)"
                        />
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="temp">
                    <span slot="label" class="tit">联系电话:</span>
                    <span class="formValue" style="padding-right: 10px">
                      <el-input v-model="detailInfo.restaurant.phone"/>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="temp">
                    <span slot="label" class="tit">地址:</span>
                    <span class="formValue" style="padding-right: 10px">
                      <el-input v-model="detailInfo.restaurant.location"/>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="temp">
                    <span slot="label" class="tit">商户联:</span>
                    <span class="formValue" style="padding-right: 10px">
                      <el-select v-model="detailInfo.restaurant.printCountA" placeholder="请选择商户联">
                        <el-option
                          v-for="item in addShop_printOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="temp">
                    <span slot="label" class="tit">顾客联:</span>
                    <span class="formValue" style="padding-right: 10px">
                      <el-select v-model="detailInfo.restaurant.printCountB" placeholder="请选择商户联">
                        <el-option
                          v-for="item in addShop_printOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="temp">
                    <span slot="label" class="tit">后厨联:</span>
                    <span class="formValue" style="padding-right: 10px">
                      <el-select v-model="detailInfo.restaurant.printCountC" placeholder="请选择商户联">
                        <el-option
                          v-for="item in addShop_printOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="temp">
                    <span slot="label" class="tit">分单商户结账联:</span>
                    <span class="formValue" style="padding-right: 10px">
                      <el-select v-model="detailInfo.restaurant.printCountD" placeholder="请选择商户联">
                        <el-option
                          v-for="item in addShop_printOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="temp">
                    <span slot="label" class="tit">是否延时:</span>
                    <span class="formValue" style="padding-right: 10px">
                      <el-switch v-model="detailInfo.restaurant.delayBool"/>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col :span="24" style="text-align:center;padding-top:40px">
          <el-button
            icon="el-icon-news"
            type="success"
            @click="bindSourcePlat($route.params.id)"
          >绑定平台</el-button>
          <el-button icon="el-icon-news" type="warning" @click="editEvent($route.params.id)">修改店铺</el-button>
          <el-button icon="el-icon-delete" type="danger">删除</el-button>
          <router-link :to="'/shop/list/'">
            <el-button icon="el-icon-back">返回店铺列表</el-button>
          </router-link>
        </el-col>
      </el-row>

      <!-- 已绑定平台数据 tabBindDatas-->
      <el-tabs
        v-for="item in tabBindDatas"
        v-model="item.acitve"
        :key="item.name"
        type="card"
        style="margin:40px 0 20px"
      >
        <el-tab-pane :label="`${item.name}绑定平台`">
          <el-form :model="item.data" label-width="180px" label-position="right">
            <el-row class="tabBorder">
              <el-col :span="12">
                <el-form-item label="temp">
                  <span slot="label" class="tit">线上门店Id:</span>
                  <span class="formValue" style="padding-right: 10px">
                    <el-input v-model="item.data.doorId"/>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="temp">
                  <span slot="label" class="tit">线上名称:</span>
                  <span class="formValue" style="padding-right: 10px">
                    <el-input v-model="item.data.partnerRestaurantName"/>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="temp">
                  <span slot="label" class="tit">客服经理:</span>
                  <span class="formValue" style="padding-right: 10px">
                    <el-input v-model="item.data.managerName"/>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="temp">
                  <span slot="label" class="tit">客服经理电话:</span>
                  <span class="formValue" style="padding-right: 10px">
                    <el-input v-model="item.data.managerPhone"/>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:center;padding-top:40px">
                <el-button type="primary" @click="updatePartner(item.data.id)">合作伙伴更新</el-button>
                <router-link :to="'/shop/list/'">
                  <el-button icon="el-icon-back">返回店铺列表</el-button>
                </router-link>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <!--账户保存开始-->
      <el-tabs v-model="saveAccountTabActive" type="card" style="margin:20px 0 40px">
        <el-tab-pane label="账户信息">
          <el-form
            ref="accountForm"
            :model="accountForm"
            label-width="180px"
            label-position="right"
          >
            <el-row class="tabBorder">
              <el-col :span="12">
                <el-form-item label="temp">
                  <span slot="label" class="tit">收款户名:</span>
                  <span class="formValue" style="padding-right: 10px">
                    <el-input v-model="accountForm.accountName"/>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="temp">
                  <span slot="label" class="tit">收款账户:</span>
                  <span class="formValue" style="padding-right: 10px">
                    <el-input v-model="accountForm.accountNo"/>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="temp">
                  <span slot="label" class="tit">收款银行:</span>
                  <span class="formValue" style="padding-right: 10px">
                    <el-input v-model="accountForm.bankName"/>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="temp">
                  <span slot="label" class="tit">收款银行支行:</span>
                  <span class="formValue" style="padding-right: 10px">
                    <el-input v-model="accountForm.bankBranch"/>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="temp">
                  <span slot="label" class="tit">收款省/直辖市:</span>
                  <span class="formValue" style="padding-right: 10px">
                    <el-input v-model="accountForm.city"/>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="temp">
                  <span slot="label" class="tit">收款市县:</span>
                  <span class="formValue" style="padding-right: 10px">
                    <el-input v-model="accountForm.province"/>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:center;padding-top:40px">
                <el-button v-if="saveBtnShow" type="primary" @click="accountFormSubmit">保存账户</el-button>
                <el-button
                  v-if="saveBtnShow === false"
                  type="primary"
                  @click="accountFormSubmit"
                >更新账户</el-button>
                <el-button @click="accountFormReset">重 置</el-button>
                <router-link :to="'/shop/list/'">
                  <el-button icon="el-icon-back">返回店铺列表</el-button>
                </router-link>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!--账户保存结束-->
    </div>

    <!-- 绑定平台 -->
    <el-dialog
      :visible.sync="bindSourceShow"
      :before-close="cancelBindSourcePopEvent"
      title="绑定平台"
      width="600px"
      append-to-body
    >
      <el-form ref="bindSourceFrom" :model="bindSourceFrom" :rules="bindSourceRules">
        <el-form-item label="平台名称" label-width="120px" prop="sourceId">
          <el-select
            v-model="bindSourceFrom.sourceId"
            placeholder="请选择平台"
            @change="sourceIdChangeEvent"
          >
            <el-option
              v-for="item in sourceOptions"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <span v-for="(item, index) in sourceOptions" :key="index">
            <span v-if="bindSourceFrom.sourceId == item.id">
              <a :href=" item.url " class="fBlue txtUnderline" target="_blank">绑定{{ item.name }}</a>
            </span>
            <span v-if="bindSourceFrom.sourceId == item.id && item.name === '饿百'">
              &nbsp;
              <a
                href="https://open-be.ele.me/dev/app/appdetail?app_id=2130&anchor=menu-project-appdetail"
                class="fBlue txtUnderline"
                target="_blank"
              >绑定{{ item.name }}非KA</a>
            </span>
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBindSourcePopEvent">取 消</el-button>
        <el-button type="primary" @click="submitBindSourcePopEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchShopDetail,
  updateShop,
  updatePartner,
  bankAccountSave,
  bankAccountUpdate
} from '@/api/restaurant'
import { orderSource } from '@/utils/options'
import { printmachineList } from '@/api/printMachine'
export default {
  name: 'DetailShop',
  data() {
    return {
      detailInfo: {
        restaurant: {
          delayBool: false
        }
      },
      bindSourceShow: false,
      ActiveShopId: null,
      bindSourceFrom: {
        sourceId: null
      },
      sourceOptions: orderSource.filter(item => item.id !== -1),
      bindSourceRules: {
        sourceId: [
          {
            type: 'number',
            required: true,
            message: '请选择平台',
            trigger: 'change'
          }
        ],
        accountCreditedId: [
          {
            required: true,
            message: '请输入收款账户',
            trigger: 'blur'
          },
          {
            required: true,
            pattern: /^[\d]+\.?\d*$/, // 输入数字和.
            message: '收款账户为数字',
            trigger: 'blur'
          }
        ],
        accountName: [
          {
            required: true,
            message: '请输入收款户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 80,
            message: '长度在 3 到 80 个字符',
            trigger: 'blur'
          }
        ],
        bankName: [
          {
            required: true,
            message: '请输入收款银行',
            trigger: 'blur'
          }
        ],
        bankBranchName: [
          {
            required: true,
            message: '请输入收款银行支行',
            trigger: 'blur'
          }
        ],
        receiveProvince: [
          {
            required: true,
            message: '请输入收款省/直辖市',
            trigger: 'blur'
          }
        ],
        receivecityCounty: [
          {
            required: true,
            message: '请输入收款市县',
            trigger: 'blur'
          }
        ]
      },
      addShop_printOptions: [
        {
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
        }
      ],
      addShop_printMacineOptions: [],
      tabBindDatas: [],
      saveAccountTabActive: '0',
      accountForm: {},
      saveBtnShow: false
    }
  },
  mounted() {
    this.fetchDetail()
    printmachineList({})
      .then(response => {
        const result = response.data
        this.addShop_printMacineOptions = result.data
      })
      .catch(err => {
        this.$message.error('错了哦，获取打印机信息失败，失败原因：' + err)
      })
  },
  methods: {
    fetchDetail() {
      fetchShopDetail(this.$route.params.id).then(response => {
        const result = response.data.data

        // 账户信息是否存在 ，不存在是用保存按钮，存在用更新按钮
        if (!result.account) {
          this.saveBtnShow = true
        } else {
          this.saveBtnShow = false
          this.accountForm = result.account
        }

        // 是否延时 是传 7 否传 0
        if (result.restaurant.delay === 7) {
          result.restaurant.delayBool = true
        } else {
          result.restaurant.delayBool = false
        }

        // 打印机编号 options数据需number
        result.restaurant.printMachineId = Number(
          result.restaurant.printMachineId
        )

        this.$set(this.$data, 'detailInfo', result)

        // 对象Object循环
        for (const [result_key, result_value] of Object.entries(
          this.detailInfo
        )) {
          orderSource.forEach(element => {
            if (result_key === element.value) {
              this.tabBindDatas.push({
                name: result_key,
                data: result_value,
                acitve: '0'
              })
            }
          })
        }
      })
    },
    bindSourcePlat(id) {
      this.bindSourceShow = true
      this.ActiveShopId = id
    },
    cancelBindSourcePopEvent() {
      this.bindSourceShow = false
      this.ActiveShopId = null
      this.bindSourceFrom.sourceId = null
      this.$refs['bindSourceFrom'].resetFields()
    },
    sourceIdChangeEvent(val) {
      console.log(val)
    },
    editEvent(id) {
      updateShop({
        id: id,
        printCountA: this.detailInfo.restaurant.printCountA,
        printCountB: this.detailInfo.restaurant.printCountB,
        printCountC: this.detailInfo.restaurant.printCountC,
        printCountD: this.detailInfo.restaurant.printCountD,
        printMachineId: this.detailInfo.restaurant.printMachineId,
        restaurantName: this.detailInfo.restaurant.restaurantName,
        delay: this.detailInfo.restaurant.delayBool === true ? 7 : 0
      }).then(response => {
        this.$message({
          message: '恭喜你，修改店铺成功',
          type: 'success'
        })
        this.fetchDetail()
      })
    },
    submitBindSourcePopEvent() {
      this.$refs.bindSourceFrom.validate(val => {
        if (val) {
          const submitOpt = this.sourceOptions.filter(
            item => item.id === this.bindSourceFrom.sourceId
          )
          console.log(submitOpt, this.ActiveShopId)
          console.log(this.bindSourceFrom)
          this.cancelBindSourcePopEvent()
        }
      })
    },
    // 合作伙伴更新
    updatePartner(id) {
      this.tabBindDatas.forEach(element => {
        if (element.data.id === id) {
          console.log(element.data)

          updatePartner({
            id: id,
            managerName: element.data.managerName,
            managerPhone: element.data.managerPhone,
            doorId: element.data.doorId,
            partnerRestaurantName: element.data.partnerRestaurantName
          }).then(response => {
            this.$message({
              message: '恭喜你，合作伙伴更新成功',
              type: 'success'
            })
            this.fetchDetail()
          })
        }
      })
    },
    accountFormSubmit() {
      if (this.saveBtnShow) {
        bankAccountSave({
          accountName: this.accountForm.accountName,
          accountNo: this.accountForm.accountNo,
          bankBranch: this.accountForm.bankBranch,
          bankName: this.accountForm.bankName,
          city: this.accountForm.city,
          province: this.accountForm.province,
          restaurantId: this.$route.params.id
        }).then(response => {
          this.$message({
            message: '恭喜你，账户保存成功！',
            type: 'success'
          })
        })
      } else {
        bankAccountUpdate({
          id: this.accountForm.id,
          accountName: this.accountForm.accountName,
          accountNo: this.accountForm.accountNo,
          bankBranch: this.accountForm.bankBranch,
          bankName: this.accountForm.bankName,
          city: this.accountForm.city,
          province: this.accountForm.province,
          restaurantId: this.$route.params.id
        }).then(response => {
          this.$message({
            message: '恭喜你，账户更新成功！',
            type: 'success'
          })
        })
        this.fetchDetail()
      }
    },
    accountFormReset() {
      this.accountForm = {
        accountName: '',
        accountNo: '',
        bankBranch: '',
        bankName: '',
        city: '',
        province: ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../sass/common.scss";
.app-container {
  padding: 20px 0;
  h1 {
    margin: 0 20px 20px;
    padding: 20px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 5px 5px rgba(175, 175, 175, 0.2);
    font-size: 25px;
    font-weight: 500;
    color: #666;
    vertical-align: middle;
    span {
      vertical-align: middle;
    }
  }
  .detail {
    min-height: 600px;
    margin: 0 20px;
    padding: 10px 10px 10px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 5px 5px rgba(175, 175, 175, 0.2);
    .el-form {
      .tabBorder {
        border: 1px solid #dfe6ec;
        border-bottom: 0;
        .el-form-item {
          border-bottom: 1px solid #dfe6ec;
          margin: 0;
          &.fullHeight {
            @include flexbox;
            @include align-items("stretch");
            .attrTable {
              margin-left: -160px;
            }
          }
          .tit {
            border-right: 1px solid #dfe6ec;
            padding-right: 14px;
            display: block;
            font-weight: normal;
            color: #999;
            line-height: 40px;
            background: #f4f8fd; // line-height: 50px ;
            &.fullHeight2 {
              height: 175px;
            }
          }
          .formValue {
            display: block;
            color: #333;
            line-height: 40px;
            .tex-cont {
              margin: 10px 10px 0;
              a {
                display: inline-block;
                margin: 0;
                padding: 0;
                line-height: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>

