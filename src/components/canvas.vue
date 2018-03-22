<template>
  <div class='canvas-wrap'>
    <img id="scream" src="../assets/img/actBG.jpg">
    <canvas id="myCanvas" :width="windowWidth" :height="windowHeight">
    您的浏览器不支持 HTML5 canvas 标签。
    </canvas>
    <div class="voucher-btn" @click="getVoucher"></div>
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
      Math.random() < 0.5 ? '邻家小妹小甜甜' : '国民初恋小甜甜',
      Math.random() < 0.5 ? '和同桌同桌同桌' : '和教导主任',
      Math.random() < 0.5 ? '在游乐场玩碰碰车' : '在动物园丢手绢'
    ]
  },
  methods: {
    getVoucher () {
      alert('领取成功')
    }
  },
  computed: {
  },
  mounted () {
    let c = document.getElementById("myCanvas")
    let ctx = c.getContext("2d")
    let img = document.getElementById("scream")
    let {windowWidth, windowHeight} = this
    img.width = windowWidth
    img.windowHeight = windowHeight
    img.onload = () => {
      console.log('onload')
      ctx.drawImage(img, 0, 0, windowWidth, windowHeight)
      ctx.font = "70px Verdana"
      ctx.fillText(this.text[0], Math.floor(windowWidth / 8), Math.floor(windowHeight * 0.26714))
      ctx.font = "24px Verdana"
      ctx.fillText(this.text[1] + this.text[2], Math.floor(windowWidth * 0.175), Math.floor(windowHeight * 0.371))
      ctx.fillText(this.text[3], Math.floor(windowWidth * 0.175), Math.floor(windowHeight * 0.436))
      img.onload = null
      img.src = c.toDataURL('image/jpeg', 1)
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
}
.voucher-btn {
  position: absolute;
  right: 40px;
  bottom: 75px;
  width: 200px;
  height: 60px;
  z-index: 100;
}
</style>
