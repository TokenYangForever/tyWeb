<template>
  <div>
    <h3>markdown编辑器</h3>
    <div class="outterWrap">
      <textarea v-model='mdInput' @input='compileMD()' class="mdText"></textarea>
      <div v-html='compileHtml' class="htmlArea"></div>
    </div>
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
    this._setTitle('mdCompiler')
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
.outterWrap {
  width: 100%;
  background-color: #f6f6f6;
  height: 600px;
}
.mdText {
  background-color: #f6f6f6;
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  display: inline-block;
  width: 49%;
  height: 100%;
  padding: 20px;
  vertical-align: top;
}
.htmlArea {
  display: inline-block;
  width: 49%;
  height: 100%;
  padding: 20px;
  vertical-align: top;
}
</style>
