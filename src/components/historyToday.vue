<template>
  <div>
    <template v-if='todayList.length > 0'>
      <h3>历史上的今天</h3>
      <div class='td-item' v-for="(item, index) in todayList" :key='index'>
        <img class='td-img' :data-img="item.src">
        <div class='td-title' @click="searchAction(item.title)">{{item.year}}<p class='td-p'>{{item.title}}</p></div>
      </div>
    </template>
  </div>
</template>

<script>
import util from '../common/util.js'
export default {
  name: 'homepage',
  data () {
    return {
      todayList: []
    }
  },
  created () {
    this._setTitle('历史上的今天')
    let day = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate() + ''
    let reqDate = new Date().getMonth() + 1 + day
    this.axios.get(`${this._config().preurl}historyToday/getToday?date=${reqDate}`).then((response) => {
      this.todayList = JSON.parse(response.data.result)
      this.$nextTick(util.lazyLoadImg)
    }).catch(() => {
      this.showAlert({
        msg: '接口异常，请联系管理员Token',
        autoClose: false,
        type: 'error'
      })
    })
  },
  methods: {
    searchAction (title) {
      location.href = `https://www.baidu.com/s?wd=${title}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.td-p {
  cursor:help;
}
.td-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-left: 10%;
  margin: 30px
}
.td-img {
  width: 20%;
  height: 20%;
}
.td-title {
  margin-left: 20px;
  text-align: left;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
</style>
