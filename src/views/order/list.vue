<template>
  <div class="app-container ldl-container-order">
    <dl class="ldl-list-search">
      <dt><i>筛选条件</i></dt>
      <dd>
        <el-form ref="formSearch" :model="formSearch" width="100%" label-position="left">
          <el-form-item label="订单来源:" label-width="90px">
            <el-radio-group v-model="formSearch.source" @change="formSearch_sourceChange">
              <el-radio v-for="item in orderSource" :key="item.id" :label="item.value" >{{ item.name }}</el-radio>
              <!--<el-radio :label="2">饿了么</el-radio>-->
              <!--<el-radio :label="3">达达</el-radio>-->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="订单类型:" label-width="90px">
            <el-radio-group v-model="formSearch.type" @change="formSearch_typeChange">
              <el-radio :label="9">全部</el-radio>
              <el-radio :label="0">预定单</el-radio>
              <el-radio :label="1">非预定单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="下单日期:" label-width="90px">
            <el-col :span="6">
              <el-date-picker v-model="formSearch.createDate" :clearable="false" type="date" placeholder="选择日期" style="width: 100%;" @change="formSearch_createDateChange"/>
            </el-col>
          </el-form-item>
          <el-form-item label="订单状态:" label-width="90px">
            <el-radio-group v-model="formSearch.state" @change="formSearch_stateChange">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="11">未配送</el-radio>
              <el-radio :label="1">待接单</el-radio>
              <el-radio :label="2">待取货</el-radio>
              <el-radio :label="3">配送中</el-radio>
              <el-radio :label="4">已完成</el-radio>
              <el-radio :label="5">已取消</el-radio>
              <el-radio :label="7">已过期</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="配送平台:" label-width="90px">
            <el-radio-group v-model="formSearch.delivery" @change="formSearch_deliveryChange">
              <el-radio :label="1">全部</el-radio>
              <el-radio :label="2">达达</el-radio>
              <el-radio :label="3">美团快送</el-radio>
              <el-radio :label="4">蜂鸟快送</el-radio>
              <el-radio :label="5">点我达</el-radio>
              <el-radio :label="6">顺丰同城送</el-radio>
              <el-radio :label="7">闪送</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商户选择:" label-width="90px" class="noMargin">
            <el-col :span="6">
              <el-select v-model="formSearch.restaurantId" placeholder="请选择商户" filterable style="width: 100%" @change="formSearch_restaurantIdChange">
                <el-option v-for="item in restaurantOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>
      </dd>
    </dl>
    <!--分页数据-->
    <dl class="ldl-list-result">
      <dt><i>筛选结果</i></dt>
      <dd>
        <div
          v-loading="listLoading"
          :class="{ loadHeight: listLoading }"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 1)">
          <div v-for="(item, idx) in pageDatas" v-show="!listLoading" :key="idx" class="box">
            <h2>
              <!--订单状态 先隐藏-->
              <!--<span class="stateTxt">{{item.statusName}}</span>-->
              <el-tag v-if="item.printStatus === 'PrintSuccess'" type="success" style="float: right;margin-top: 3px;">打印成功</el-tag>
              <el-tag v-if="item.printStatus === 'PrintFail'" type="danger" style="float: right;margin-top: 3px;">{{ item.printStatusName }}</el-tag>

              <span class="ordIdx">#{{ item.restaurantNumber }}</span>
              <span v-if="item.deliverOrderStatus === 'DAI_JIE_DAN'" class="typeTxt">待接单</span>
              <span v-if="item.deliverOrderStatus === 'DAI_QU_HUO'" class="typeTxt">待取货</span>
              <span v-if="item.deliverOrderStatus === 'PEI_SONG_ZHOING'" class="typeTxt">配送中</span>
              <span v-if="item.deliverOrderStatus === 'YI_WAN_CHENG'" class="typeTxt">已完成</span>
              <span v-if="item.deliverOrderStatus === 'YI_QU_XIAO'" class="typeTxt" style="color:#f0082d">已取消</span>
              <span v-if="item.deliverOrderStatus === 'YI_GUO_QI'" class="typeTxt">已过期</span>
              <span v-if="item.deliverOrderStatus === 'ZHI_PAI_DAN'" class="typeTxt">指派单</span>
              <span v-if="item.deliverOrderStatus === 'YI_CHANG_FAN_HUI_ZHONG'" class="typeTxt">妥投异常之物品返回中</span>
              <span v-if="item.deliverOrderStatus === 'YI_CHANG_FAN_HUI_WANG_CHENG'" class="typeTxt">妥投异常之物品返回完成</span>
              <span v-if="item.deliverOrderStatus === 'CHUANG_JIAN_SHI_BAI'" class="typeTxt">创建达达运单失败</span>
              <span v-if="item.deliverOrderStatus === 'WEI_PEI_SONG'" class="typeTxt">未配送</span>
              <span class="sourceTxt">{{ item.partnerName }}</span>
            </h2>

            <el-row class="itemCont">
              <el-col :span="20" >
                <div>
                  <svg-icon class-name="itemrIcon" icon-class="user" />
                  <span class="itemBold">{{ item.consignee }}</span>
                  <!--<span class="custmerType">门店新客</span>-->
                  <span class="custmerType">{{ item.phoneList }}</span>
                </div>
                <div class="itemInline"><span class="f14">{{ item.address }}</span> <span v-if="!(!item.deliverOrder && typeof (item.deliverOrder) !== 'undefined' && item.deliverOrder !== 0)" class="itemBold">
                  <i v-if= "item.deliverOrder.distance < 1000">{{ item.deliverOrder.distance }} m</i>
                  <i v-else>{{ item.deliverOrder.distance / 1000 }} km </i>
                </span></div>
              </el-col>
              <el-col :span="4" class="item-right">
                <!--<span>18698788888 转 2222</span>-->
                <el-button v-show="(!item.deliverOrder && typeof (item.deliverOrder) !== 'undefined' && item.deliverOrder !== 0) || item.deliverOrderStatus === 'YI_QU_XIAO'" size="small" type="warning" @click="sendEvent('dada',item.id, item.deliverOrderStatus)">发送达达</el-button>
                <el-button v-show="!(!item.deliverOrder && typeof (item.deliverOrder) !== 'undefined' && item.deliverOrder !== 0) " :disabled = "item.deliverOrderStatus === 'DAI_QU_HUO'||item.deliverOrderStatus === 'PEI_SONG_ZHOING' || item.deliverOrderStatus === 'YI_QU_XIAO' || item.deliverOrderStatus === 'YI_WAN_CHENG'" size="small" type="success" @click="sendCancelEvent('dada',item.id, item.deliverOrderStatus)">取消达达配送</el-button>

              </el-col>
            </el-row>

            <el-row class="itemCont">
              <el-col :span="20" >
                <div>
                  <svg-icon class-name="itemrIcon" icon-class="component" />
                <span class="itemBold">订单详情</span> <span class="grayTxt">{{ item.restaurantName }}</span></div>
                <transition name="itemPriceAbout">
                  <div v-show="item.switchFlag" class="itemPriceAbout">

                    <p>收取配送费: + ¥{{ item.deliverFee | priceFormatYuan }}</p>
                    <p>平台服务费: - ¥{{ item.partnerPrice | priceFormatYuan }} </p>
                    <p>顾客实际支付: ¥{{ item.totalPrice | priceFormatYuan }}</p>
                    <p>本单预计收入: ¥{{ item.originalPrice | priceFormatYuan }}</p>
                    <p v-html="$options.filters.printDetail(item.printDetailInPage)"/>
                  </div>
                </transition>

              </el-col>
              <el-col :span="4" class="item-right">
                <span v-if="item.switchFlag" class="itemSwitch" @click="switchOrderRestaurantInfo(item.id,item.switchFlag)">收缩 <i class="el-icon-arrow-up"/></span>
                <span v-if="!item.switchFlag" class="itemSwitch" @click="switchOrderRestaurantInfo(item.id,item.switchFlag)">展开 <i class="el-icon-arrow-down"/></span>
              </el-col>
            </el-row>

            <!--配送状态如果是非未配送的 各种情况-->
            <!--DAI_JIE_DAN("待接单", "1"),-->
            <!--DAI_QU_HUO("待取货", "2"),-->
            <!--PEI_SONG_ZHOING("配送中", "3"),-->
            <!--YI_WAN_CHENG("已完成", "4"),-->
            <!--YI_QU_XIAO("已取消", "5"),-->
            <!--YI_GUO_QI("已过期", "7"),-->
            <!--ZHI_PAI_DAN("指派单", "8"),-->
            <!--YI_CHANG_FAN_HUI_ZHONG("妥投异常之物品返回中", "9"),-->
            <!--YI_CHANG_FAN_HUI_WANG_CHENG("妥投异常之物品返回完成", "10"),-->
            <!--CHUANG_JIAN_SHI_BAI("创建达达运单失败", "1000"),-->
            <!--WEI_PEI_SONG("未配送", "11");-->

            <el-row v-if="(item.deliverOrderStatus === 'DAI_QU_HUO') || (item.deliverOrderStatus === 'PEI_SONG_ZHOING') || (item.deliverOrderStatus === 'YI_WAN_CHENG') || (item.deliverOrderStatus === 'YI_QU_XIAO') || (item.deliverOrderStatus === 'YI_GUO_QI') " class="itemCont">
              <el-col :span="20" >
                <div>
                  <i class="el-icon-location itemrIcon"/>
                  <span class="itemBold">配送信息 </span> <span class="grayTxt">实际配送金额：¥{{ item.deliverOrder.fee| priceFormatYuan }}</span>
                  <span class="grayTxt">小费¥{{ item.deliverOrder.tips | priceFormatYuan }}</span>
                </div>
                <div class="itemInline">
                  <span class="f14">骑手:{{ item.deliverOrder.username }} </span>
                  <span class="f14"> {{ item.deliverOrder.mobile }}</span>
                  <span v-if="item.deliverOrder.status === 'YI_WAN_CHENG'">
                    <el-tag type="success" size="small" >{{ item.deliverOrder.statusName }}</el-tag>
                  </span>
                  <span v-else>
                    <el-tag type="info" size="small">{{ item.deliverOrder.statusName }}</el-tag>
                  </span>

                </div>
                <div class="itemInline">
                  <span>配送平台：{{ item.deliverOrder.deliverType }}</span>
                </div>
                <div class="itemInline">
                  <span v-if= "item.deliverOrder.distance < 1000">配送距离：{{ item.deliverOrder.distance }} m</span>
                  <span v-else>配送距离：{{ item.deliverOrder.distance / 1000 }} km </span>
                </div>
              </el-col>
              <el-col :span="4" class="item-right">
                <!--<span>不可索赔</span>-->
                <el-button v-show="item.deliverOrder.status !== 'YI_WAN_CHENG'" size="mini" style="margin-top: 10px"> 查看地图</el-button>
                <el-button v-show="item.deliverOrder.status === 'YI_WAN_CHENG'" size="mini" style="margin-top: 10px"> 评价骑手</el-button>
              </el-col>
            </el-row>

            <el-row v-else class="itemCont">
              <el-col :span="24">
                <div>
                  <i class="el-icon-location itemrIcon"/>
                  <span class="itemBold">配送信息</span> <span class="grayTxt">暂无</span>
                  <span v-if="item.description " style="font-size: 12px;float: right;color: #8a6d3b"> 注意事项：{{ item.description }}</span>
                </div>
              </el-col>
            </el-row>

            <el-row v-if="!(!item.deliverOrder && typeof (item.deliverOrder) !== 'undefined' && item.deliverOrder !== 0) && item.deliverOrderStatus !== 'YI_QU_XIAO'" class="itemCont" >
              <el-col :span="20" style="position:relative;">
                <span style="position: absolute;top: 7px;left:0;"><svg-icon class-name="itemrIcon" icon-class="shopping"/></span>
                <div style="padding-left: 50px">
                  <div class="itemBold pay">客户实付</div>
                  <div class="itemBold pay">本单预计收入</div>
                </div>

              </el-col>
              <el-col :span="4" class="item-right" style="padding-top: 5px">
                <div class="itemBold pay"><span>已支付</span> <span>¥ {{ item.totalPrice | priceFormatYuan }}</span></div>
                <div class="itemBold pay"><span class="fontRed">预计收入</span> <span class="fontRed">¥{{ item.originalPrice | priceFormatYuan }}</span></div>
              </el-col>
            </el-row>

            <el-row class="itemCont noBord">
              <el-col :span="20" style="position:relative;">

                <div class="itemInline" style="padding-left: 50px">
                  <div class="f14">下单时间：{{ item.deliverTime }}</div>
                  <div class="f14">创建时间：{{ item.createDateText }}</div>

                  <div class="f14">订单号：{{ item.id }}</div>
                </div>

              </el-col>
              <el-col :span="4" class="item-right" style="padding-top: 5px">
                <el-button size="mini" style="margin-top: 10px" @click="printEvent(item.id)"> 打印订单</el-button>
              </el-col>
            </el-row>

          </div>
        </div>
        <div v-if="pageDatas.length == 0 && listLoading == false" style="text-align: center">暂无数据</div>

        <el-row>
          <el-col :span="24" class="pageTool">

            <el-pagination
              :current-page.sync="currentPage"
              :page-size="pageSize"
              :total="total"
              layout="total,prev, pager, next, jumper"
              @current-change="handleCurrentChange"/>
          </el-col>
        </el-row>
      </dd>

    </dl>
    <!--分页-->

  </div>
</template>

<script>
import { dateFormat } from '@/filters/index.js'
import { fetchMerchants } from '@/api/restaurant'
import { searchByPage, resendDaDa, cancelDaDa } from '@/api/order'
import { orderSource } from '@/utils/options'

export default {
  name: 'ListOrder',
  filters: {

    printDetail: function(msg) {
      const msg2 = msg.replace(/\^H3/g, '')
      return msg2.replace(/\^H2/g, '')
    }

  },
  data: function() {
    return {
      formSearch: {
        source: null,
        type: 9, // 是否预订单
        createDate: new Date(),
        state: null, // 订单状态
        restaurantId: null,
        delivery: 1
      },
      restaurantOptions: [{
        label: '全部',
        value: null
      }],
      orderSource: orderSource,
      // 分页开始行
      listLoading: true,
      currentPage: 1,
      start: 0,
      pageSize: 5,
      total: null,
      pageDatas: []
    }
  },
  mounted() {
    this.fetchRestaurant()
    this.$nextTick(() => {
      const spans = this.$refs.formSearch.$el.querySelectorAll('span.el-radio__input');
      [].forEach.call(spans, function(span) {
        span.style.setProperty('display', 'none')
      })
    })
  },
  methods: {
    // 订单来源
    formSearch_sourceChange(data) {
      this.fetchList('source', data)
    },
    // 订单类型
    formSearch_typeChange(data) {
      this.fetchList('type', data)
    },
    formSearch_stateChange(data) {
      this.fetchList('state', data)
    },
    formSearch_createDateChange(data) {
      this.fetchList('createDate', data)
    },
    formSearch_restaurantIdChange(data) {
      this.fetchList('restaurantId', data)
    },
    formSearch_deliveryChange(data) {
      this.fetchList('delivery', data)
    },
    fetchList: function(key, data) {
      this.listLoading = true
      const submit_query = {
        'queryDate': dateFormat(this.formSearch.createDate, 'd'),
        'pageNum': this.currentPage,
        'pageSize': this.pageSize,
        'restaurantId': this.formSearch.restaurantId,
        'partner': this.formSearch.source
      }

      if (this.formSearch.type === 9) {
        submit_query.isBook = null
      } else if (this.formSearch.type === 0) {
        submit_query.isBook = false
      } else if (this.formSearch.type === 1) {
        submit_query.isBook = true
      }

      searchByPage(submit_query).then(response => {
        const result = response.data.data
        this.total = result.totalRows
        this.listLoading = false
        result.pageData.forEach((item) => {
          item.switchFlag = false
        })
        this.pageDatas = result.pageData
      }).catch(() => {
        this.listLoading = false
      })
    },
    fetchRestaurant: function() {
      fetchMerchants({}).then(response => {
        response.data.data.forEach((item) => {
          this.restaurantOptions.push({
            label: item.restaurantName,
            value: item.id
          })
        })
        this.formSearch.restaurantId = this.restaurantOptions[0].value
        this.fetchList()
      })
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val
      this.start = (val - 1) * this.pageSize
      this.listLoading = true
      this.fetchList()
    },
    switchOrderRestaurantInfo(id, flag) {
      this.pageDatas.forEach((item) => {
        if (item.id === id) {
          if (flag === true) {
            item.switchFlag = false
          } else {
            item.switchFlag = true
          }
        }
      })
    },
    sendEvent(partner, id, status) {
      //

      this.$confirm('是否确认发送达达', '提示', {
        confirmButtonText: '发送',
        cancelButtonText: '取消',
        center: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            if (partner === 'dada') {
              resendDaDa({ id: id }).then(response => {
                this.fetchList()
              })
              done()
              instance.confirmButtonLoading = false
            }
          } else {
            done()
          }
        }
      }).then(() => {}).catch(() => {})
    },
    sendCancelEvent(partner, id, status) {
      // 如果订单状态是已取消、配送中，则不触发

      this.$confirm('是否取消？', '提示', {
        confirmButtonText: '确认取消',
        cancelButtonText: '关闭',
        center: true,
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            if (partner === 'dada') {
              cancelDaDa({ id: id }).then(response => {
                setTimeout(() => {
                  this.fetchList()
                }, 100)
              })
              done()
              instance.confirmButtonLoading = false
            }
          } else {
            done()
          }
        }
      }).then(() => {}).catch(() => {})
    },
    printEvent(id) {
      this.$router.push({
        path: '/order/print/',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../sass/order.scss";
  .loadHeight{
    height: 300px;
  }
</style>
