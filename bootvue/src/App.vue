<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
window.addEventListener('devicemotion', deviceMotionHandler, false)
var shakeThreshold = 3000
var lastUpdate = 0
var curShakeX = 0,
  curShakeY = 0,
  curShakeZ = 0,
  lastShakeX = 0,
  lastShakeY = 0,
  lastShakeZ = 0
function deviceMotionHandler (event) {
  var acceleration = event.accelerationIncludingGravity
  var curTime = new Date().getTime()
  if ((curTime - lastUpdate) > 100) {
    var diffTime = curTime - lastUpdate
    lastUpdate = curTime
    curShakeX = acceleration.x
    curShakeY = acceleration.y
    curShakeZ = acceleration.z
    var speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000
    if (speed > shakeThreshold) {
      // alert(JSON.stringify(acceleration))
      // alert('摇一摇')
    }
    lastShakeX = curShakeX
    lastShakeY = curShakeY
    lastShakeZ = curShakeZ
  }
}
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
