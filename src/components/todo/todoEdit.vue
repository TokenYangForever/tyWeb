<template>
  <section class="todoapp">
      <h1>Edit todos</h1>
        <div class="searchWrap">
          <el-input
            placeholder="请输入itemid"
            icon="search"
            v-model="serId"
            :on-icon-click="searchAction">
          </el-input>
          <div class="search-explain">
            <i class="el-icon-information"></i>
            首先根据id查找出item，再进行操作，暂不支持批量操作
          </div>
        </div>
        <el-tabs v-model="activeName" v-if='itemContent.itemid'>
          <el-tab-pane label="编辑" name="编辑">
              
          </el-tab-pane>
          <el-tab-pane label="删除" name="删除">删除</el-tab-pane>
        </el-tabs>
  </section>
</template>

<script>
import config from '../../common/config'
export default {
  name: 'todoEdit',
  data () {
    return {
      activeName: '编辑',
      serId: '',
      itemContent: {}
    }
  },
  methods: {
    addAction () {
    },
    clearSearch () {
      this.serId = ''
    },
    searchAction () {
      this.axios.get(`${config.preurl}searchById?serId=${this.serId}`)
      .then((response) => {
        console.log(response)
        if (response.data.code === 200) {
          this.itemContent = response.data.result[0]
          this.clearSearch()
        } else {
          return Promise.reject(response.data.err.code)
        }
      }).catch((err) => {
        this.itemContent = {}
        this.$notify.error({
          title: '错误',
          message: err,
          duration: '1800'
        });
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchWrap {
  margin: 10px 5%
}
.search-explain {
  margin-top: 5px;
  color: #324057;
}
.input-title {
  font-size: 22px;
}
.todoapp {
    background: #fff;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    padding-bottom: 10px;
}
.todoapp h1 {
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
}
.td-input-item{
    margin: 15px 0;
    padding: 0 10%;
}
.td-button-wrap {
  margin: 20px 0
}

</style>
