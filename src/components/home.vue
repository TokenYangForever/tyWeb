<template>
  <div>
    <p>this is homepage</p>
    <img id='preView' :src='preViewUrl'>
    <div><input type="file" title="上传" @change='checkFile()' id='fileLoader'></div>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      preViewUrl: ''
    }
  },
  created () {
  },
  methods: {
    checkFile () {
      this.preViewUrl = window.URL.createObjectURL(document.querySelector('#fileLoader').files[0])
      // alert('改变了')
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
