<template>
  <div class="app-container">
    this is list 合作伙伴
    <router-link :to="'/partner/detail/'+testId">
      <el-button type="primary" size="small" icon="el-icon-edit"> 详情</el-button>
    </router-link>
  </div>
</template>

<script>

export default{
  name: 'ListPartner',
  components: {  },
  data() {
     return {
        testId:111
     }
  },
  methods: {

  }
}
</script>
