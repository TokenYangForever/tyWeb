<template>
  <div>
    <h3>markdown编辑器</h3>
    <textarea v-model='mdInput' @input='compileMD()'></textarea>
    <div v-html='compileHtml'></div>
  </div>
</template>

<script>
import marked from 'marked'
export default {
  name: 'mdCompiler',
  data () {
    return {
      mdInput: '',
      compileHtml: ''
    }
  },
  created () {
  },
  methods: {
    compileMD () {
      this.compileHtml = marked(this.mdInput)
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
