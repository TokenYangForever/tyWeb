<template>
  <div class='at-input-wrap'>
    <div class="at-input-item">
      <h4>标题</h4>
      <b-form-input v-model.trim="title"
                    type="text"
                    :state="nameState"
                    placeholder="这里输入标题"></b-form-input>
      <b-form-feedback>
        输入字符太短了
      </b-form-feedback>
    </div>
    <div class="at-input-item">
      <h4>描述</h4>
      <b-form-input v-model.trim="description"
                    type="text"
                    :state="desState"
                    placeholder="这里输入描述"></b-form-input>
      <b-form-feedback>
        多输几个字会死啊
      </b-form-feedback>
    </div>
    <b-button :variant="'primary'" @click = 'loadAction'>
      添加
    </b-button>
    <b-button :variant="'secondary'" @click = 'cleanAction'>
      清空
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'addTodo',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  created () {
    this._setTitle('addTodo')
  },
  methods: {
    loadAction () {
      let {title, description} = this
      if (this.nameState || this.desState) {
        return
      }
      this.axios.post(`${this._config().preurl}todo/savetodo`, {
        title,
        description
      }).then((response) => {
        if (response.data.err) {
          throw Error(response.data.err)
        }
        this.showAlert({
          msg: '添加成功，记得按时完成哦~',
          autoClose: true,
          type: 'success'
        })
        this.cleanAction()
      }).catch((e) => {
        this.showAlert({
          msg: '接口异常，请联系管理员Token',
          autoClose: false,
          type: 'error'
        })
      })
    },
    cleanAction () {
      this.title = this.description = ''
    }
  },
  computed: {
    nameState () {
      return this.title.length > 2 ? null : 'invalid';
    },
    desState () {
      return this.description.length > 4 ? null : 'invalid';
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.at-input-wrap{
  padding: 5px 10%
}
.at-input-item{
  margin: 10px 0
}
</style>
