<template>
  <div>
    <div class="tableAxis">
      <span class="tableCell" :class="{ active: current.includes(index) }" :style="{ height: item*20 + 'px', marginTop: 400-item*20 + 'px' }" v-for="(item, index) in data"><em class="tableCellIndex">{{item}}</em></span>
    </div>
    <div class="selectWrap">
      <span>排序方法</span>
      <b-form-select v-model="method" :options="options" class="mSelect"></b-form-select>
    </div>
    <div class="selectWrap">
      <span>动画速度</span>
      <b-form-select v-model="speed" :options="sOpts" class="mSelect"></b-form-select>
    </div>
    
    <div>
      <b-button size="sm" variant="info" @click='startAction'>开始</b-button>
      <b-button size="sm" variant="info" @click='resetAction'>重置</b-button>
    </div>
  </div>
</template>

<script>
const METHOD_MAP = {
  '冒泡排序': 'bubbleSort',
  '快速排序': 'fastSort'
}
export default {
  name: 'algorithm',
  data () {
    return {
      options: [
        '冒泡排序',
        '快速排序'
      ],
      sOpts: [
        100,
        200,
        500
      ],
      data: [6, 11, 14, 1, 8, 15, 13, 4, 10, 2, 9, 5, 12, 3, 7],
      // data: [1, 2, 3, 4, 5, 6],
      method: '冒泡排序',
      current: [0],
      speed: 200
    }
  },
  created () {
    this.initial = [6, 11, 14, 1, 8, 15, 13, 4, 10, 2, 9, 5, 12, 3, 7]
    this.sort = []
  },
  methods: {
    startAction () {
      this.sort = []
      this[METHOD_MAP[this.method]]()
      this.sortAction()
    },
    resetAction () {
      this.data = [...this.initial]
      this.sort = []
    },
    sortAction () {
      let data = this.data
      if (!this.sort.length) {
        return
      }
      let sortArr = [...this.sort]
      let timeer = setInterval(() => {
        let item = sortArr.shift()
        let temp = data[item[0]]
        this.current = [item[0], item[1]]
        data.splice(item[0], 1, data[item[1]])
        data.splice(item[1], 1, temp)
        if (sortArr.length === 0) {
          clearInterval(timeer)
        }
      }, this.speed)
    },
    swap (arr, i, j) {
      let data = this.data
      let temp = data[j]
      arr[j] = arr[i]
      arr[i] = temp
      data.splice(j, 1, data[i])
      data.splice(i, 1, temp)
    },
    bubbleSort () {
      let {data, speed} = this
      let arr = [...data]
      let i = 0
      console.time('bubble')
      let outTimeer = setInterval(() => {
        let j = 0
        let timeer = setInterval(() => {
          if (arr[j] > arr[j + 1]) {
            this.swap(arr, j, j + 1)
          }
          this.current = [j, ++j]
          if (j >= arr.length - 1 - i) {
            clearInterval(timeer)
            if (j === arr.length - 1 - i) {
              i += 1
            }
          }
        }, speed)
        if (i >= arr.length - 1) {
          clearInterval(outTimeer)
          console.timeEnd('bubble')
        }
      }, speed)
    },
    fastSort () {
      let array = [...this.data]
      this.fsSubFunc(array, 0, array.length)
    },
    fsSubFunc (array, prev, numsize) {
      let nonius = prev
      let j = numsize - 1
      let flag = array[prev]
      if ((numsize - prev) > 1) {
        while (nonius < j) {
          console.log('dida')
          for (; nonius < j; j--) {
            if (array[j] < flag) {
              this.sort.push([nonius, j])
              array[nonius++] = array[j]
              break
            }
          }
          for (; nonius < j; nonius++) {
            if (array[nonius] > flag) {
              this.sort.push([j, nonius])
              array[j--] = array[nonius]
              break
            }
          }
        }
        array[nonius] = flag
        this.fsSubFunc(array, 0, nonius)
        this.fsSubFunc(array, nonius + 1, numsize)
      }
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tableAxis {
  height: 400px;
  margin: 45px 20px;
  background: #f4f4f8;
  box-sizing: border-box;
}
.tableCell {
  width: 20px;
  margin-left: 15px;
  float: left;
  position: relative;
  background-color: #333;
  bottom: 0;
}
.tableCellIndex {
  position: absolute;
  bottom: -24px;
  left: 4px;
}
.mSelect {
  width: 300px;
}
.active {
  background-color: red;
}
.selectWrap {
  margin: 15px
}
</style>
