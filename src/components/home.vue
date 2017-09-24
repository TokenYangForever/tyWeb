<template>
  <div>
    <p>this is homepage</p>
    <img id='preView' :src='preViewUrl'>

    <form role="form" id="myForm" method="post" enctype="multipart/form-data">
      <input type="file" title="上传"  id='fileLoader'>
    </form>

    <b-button :variant="'primary'" @click = 'uploadAction()'>
      上传
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      preViewUrl: '',
      base64: ''
    }
  },
  created () {
  },
  methods: {
    checkFile () {
      this.preViewUrl = window.URL.createObjectURL(document.querySelector('#fileLoader').files[0])
      // alert('改变了')
    },
    uploadAction () {
      let vm = this
      // if (!this.preViewUrl) {
      //   alert('请选择图片')
      // } else {
        let reader = new FileReader();
        reader.readAsDataURL(document.querySelector('#fileLoader').files[0]);
        reader.onload = function (e) {
          vm.preViewUrl = this.result
          vm.axios.post(`${vm._config().preurl}uploadimg`, {
            imgUrl: this.result
          }).then((response) => {
            if (response.data.err) {
              return Promise.reject()
            }
            vm.showAlert({
              msg: '上传成功~',
              autoClose: true,
              type: 'success'
            })
          }).catch(() => {
            vm.showAlert({
              msg: '接口异常，请联系管理员Token',
              autoClose: false,
              type: 'error'
            })
          })
        }
      // }
      // } else {
      //   let formData = new FormData()
      //   let fileObj = document.querySelector('#fileLoader').files[0]
      //   formData.append('fulAvatar', fileObj)
      //   this.axios.post(`${this._config().preurl}uploadimg`, {
      //     data: fileObj
      //   }).then((response) => {
      //     if (response.data.err) {
      //       return Promise.reject()
      //     }
      //     this.showAlert({
      //       msg: '上传成功~',
      //       autoClose: true,
      //       type: 'success'
      //     })
      //   }).catch(() => {
      //     this.showAlert({
      //       msg: '接口异常，请联系管理员Token',
      //       autoClose: false,
      //       type: 'error'
      //     })
      //   })
      // }
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
