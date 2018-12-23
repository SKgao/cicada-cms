<template>
  <div class="app-container">
    <dl class="ldl-list-search">
      <dt><i>商品列表</i></dt>
      <dd>
11
      </dd>
    </dl>

  </div>
</template>

<script>

export default{
  name: 'ListCommodity',
  components: { },
  data() {
    return {
      formSearch: {

      },
      tableData: [],
      listLoading: true,
      start: 0, // 分页开始行
      currentPage: 1,
      pageSize: 5,
      total: null,
    }
  },
  mounted() {
    this.fetchPageData()
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

    fetchPageData() {

    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val
      this.start = (val - 1) * this.pageSize
      this.listLoading = true
      this.fetchPageData()
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

