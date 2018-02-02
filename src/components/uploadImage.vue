<template>
  <div>
    <p>上传图片</p>
    <img id='preView' :src='preViewUrl'>
    <input type="file" title="上传" @change='checkFile' id='fileLoader'><br>
    <b-button :variant="'primary'" @click = 'uploadAction()'>
      上传
    </b-button>
    <hr>
    <div>
      <h4>把网络图片存入服务器数据库</h4>
      <ul>
        <li class="inputLi">长链接：<input type="text" v-model='longUrl'></li>
        <li class="inputLi">短连接：<input type="text" v-model='shortUrl'></li>
        <li class="inputLi">描述：<input type="text" v-model='description'></li>
      </ul>
      <b-button :variant="'primary'" @click = 'addAction()'>
        存入数据库
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'uploadImg',
  data () {
    return {
      preViewUrl: '',
      base64: '',
      isImage: false,
      imgName: '',
      longUrl: '',
      shortUrl: '',
      description: ''
    }
  },
  created () {
    this._setTitle('uploadImg')
    window.vm = this
  },
  methods: {
    checkFile () {
      let vm = this
      let reader = new FileReader()
      let _file = document.querySelector('#fileLoader').files[0]

      this.isImage = this.imageVaild(_file.type)
      this.imgName = _file.name
      reader.readAsDataURL(_file)
      reader.onload = function () {
        vm.preViewUrl = this.result
      }
    },
    uploadAction () {
      if (!this.preViewUrl) {
        this.showAlert({
          msg: '请选择图片',
          type: 'error'
        })
        return
      }
      if (!this.isImage) {
        this.showAlert({
          msg: '当前选择图片格式不合法',
          type: 'error'
        })
        this.cleanInput()
        return
      }
      this.axios.post(`${this._config().preurl}uploadimg`, {
        imgUrl: this.preViewUrl,
        imgName: this.imgName
      }).then((response) => {
        if (response.data.err) {
          return Promise.reject()
        }
        this.showAlert({
          msg: '上传成功~',
          autoClose: true,
          type: 'success'
        })
        this.cleanInput()
      }).catch(() => {
        this.showAlert({
          msg: '接口异常，请联系管理员Token',
          autoClose: false,
          type: 'error'
        })
      })
    },
    cleanInput () {
      document.querySelector('#fileLoader').value = ''
      this.preViewUrl = this.longUrl = this.shortUrl = this.description = ''
    },
    imageVaild (type) {
      return /\/(png|jpg|gif|jpeg)$/.test(type)
    },
    addAction () {
      let {longUrl, shortUrl, description} = this
      if (!longUrl || !shortUrl || !description) {
        return
      }
      this.axios.post(`${this._config().preurl}saveImgUrl`, {
        longUrl,
        shortUrl,
        description
      }).then((response) => {
        if (response.data.err) {
          return Promise.reject()
        }
        this.showAlert({
          msg: '操作成功~',
          autoClose: true,
          type: 'success'
        })
        this.cleanInput()
      }).catch((e) => {
        console.log(e)
        this.cleanInput()
        this.showAlert({
          msg: '接口异常，请联系管理员Token',
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
#preView{
  width: 300px;
  height: 300px;
}
.inputLi{
  margin-bottom: 10px;
}
</style>
