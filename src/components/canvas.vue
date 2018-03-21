<template>
  <div class='canvas-wrap'>
    <img id="scream" src="../assets/img/actBG.jpg">
    <canvas id="myCanvas" :width="windowWidth" :height="windowHeight">
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'canvas',
  data () {
    return {
      title: '',
      description: '',
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  },
  created () {
    this._setTitle('canvas')
    this.text = [
      Math.random() < 0.5 ? '70' : '90',
      Math.random() < 0.5 ? '邻家小妹' : '国民初恋',
      Math.random() < 0.5 ? '和同桌' : '和教导主任',
      Math.random() < 0.5 ? '在游乐场玩碰碰车' : '在动物园丢手绢'
    ]
  },
  methods: {
  },
  computed: {
  },
  mounted () {
    let c = document.getElementById("myCanvas")
    let ctx = c.getContext("2d")
    window.c = c
    window.ctx = ctx
    let img = document.getElementById("scream")
    // let img = document.createElement('img')
    // img.src = "http://101.200.35.148/actBG.jpg"
    img.width = this.windowWidth
    img.windowHeight = this.windowHeight
    img.onload = () => {
      console.log('onload')
      ctx.drawImage(img, 0, 0, this.windowWidth, this.windowHeight)
      ctx.font = "70px Verdana"
      ctx.fillText(this.text[0], 50, 180)
      ctx.font = "24px Verdana"
      ctx.fillText(this.text[1] + this.text[2], 70, 260)
      ctx.fillText(this.text[3], 70, 305)
      img.onload = null
      img.src = c.toDataURL('image/jpeg')
      c.style.display = 'none'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas-wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
#myCanvas {
  position: absolute;
  top: 0;
  left: 0;
}
#scream {
  width: 400px;
  height: 700px;
}
</style>
