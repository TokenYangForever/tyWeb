<template>
<b-table striped hover :items="todoData" :fields="fields">
  <template slot="actions" scope="row">
    <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
    <b-btn size="sm" @click.stop="clickAction(row.item)" variant="primary">open|close</b-btn>
  </template>
</b-table>
</template>

<script>

export default {
  name: 'todoList',
  data () {
    return {
      todoData: [],
      fields: {
        title: {
          label: '标题',
          sortable: false,
          thStyle: {
            textAlign: 'center'
          }
        },
        description: {
          label: '描述',
          sortable: false,
          thStyle: {
            textAlign: 'center'
          }
        },
        statu: {
          label: '状态',
          sortable: true,
          thStyle: {
            textAlign: 'center'
          }
        },
        actions: {
          label: 'Actions'
        }
      }
    }
  },
  created () {
    this._setTitle('todoList')
    this.axios.get(`${this._config().preurl}todo/getTodo`).then(({data}) => {
      this.todoData = data.result.map((item) => {
        item._rowVariant = item.statu === 'done' ? 'success' : 'warning'
        return item
      })
    }).catch(() => {
      this.showAlert({
        msg: '接口异常，请联系管理员Token',
        autoClose: false,
        type: 'error'
      })
    })
  },
  methods: {
    clickAction ({itemid}) {
      let listitem = this.todoData.find((val) => itemid === val.itemid)
      let changeStatu = listitem.statu === 'done' ? 'unsolve' : 'done'
      let changeVariant = listitem.statu === 'done' ? 'warning' : 'success'
      this.axios.get(`${this._config().preurl}todo/updateItem?statu=${changeStatu}&serid=${itemid}`)
      .then((data) => {
        data = data.data
        if (data.code === 200) {
          listitem.statu = changeStatu
          listitem._rowVariant = changeVariant
        } else {
          return Promise.reject(data.err)
        }
      }).catch(() => {
        this.showAlert({
          msg: '接口异常，请联系管理员Token',
          autoClose: false,
          type: 'error'
        })
      })
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
th div{
  text-align: center;
}
</style>
