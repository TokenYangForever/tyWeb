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
      <p v-if='sort.length > 0'>一共需要替换{{sort.length}}次</p>
    </div>
  </div>
</template>

<script>
const METHOD_MAP = {
  '冒泡排序': 'bubbleSort',
  '快速排序': 'fastSort',
  '插入排序': 'insertSort',
  '选择排序': 'chooseSort'
}
export default {
  name: 'algorithm',
  data () {
    return {
      options: Object.keys(METHOD_MAP),
      sOpts: [
        100,
        200,
        500
      ],
      data: [6, 11, 14, 1, 8, 15, 13, 4, 10, 2, 9, 5, 12, 3, 7],
      sort: [], // 这个数组用来表示替换过程
      method: '冒泡排序',
      current: [0],
      speed: 200,
      flag: false
    }
  },
  created () {
    window.vm = this
    this.initial = [...this.data]
  },
  methods: {
    startAction () {
      let {data, method} = this
      if (this.flag) {
        return
      }
      this.flag = true
      this.sort = []
      console.time(`${method}`)
      this[METHOD_MAP[method]]([...data])
      console.timeEnd(`${method}`)
      this.sortAction()
    },
    resetAction () {
      this.data = [...this.initial]
      this.sort = []
    },
    sortAction () {
      let {sort, data, speed} = this
      if (!sort.length) {
        return
      }
      let sortArr = [...sort]
      let timeer = setInterval(() => {
        let item = sortArr.shift()
        let temp = data[item[0]]
        this.current = [item[0], item[1]]
        data.splice(item[0], 1, data[item[1]])
        data.splice(item[1], 1, temp)
        if (sortArr.length === 0) {
          this.flag = false
          clearInterval(timeer)
        }
      }, speed)
    },
    swap (arr, i, j) {
      let temp = arr[j]
      arr[j] = arr[i]
      arr[i] = temp
      this.sort.push([i, j])
    },
    chooseSort (arr) {
      let minIndex = 0
      for (let i = 0; i < arr.length; i++) {
        minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[minIndex]) {
            minIndex = j
          }
        }
        if (minIndex !== i) {
          this.swap(arr, minIndex, i)
        }
      }
    },
    bubbleSort (arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
          if (arr[j] > arr[j + 1]) {
            this.swap(arr, j, j + 1)
          }
        }
      }
    },
    insertSort (arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
          if (arr[j] < arr[j - 1]) {
            this.swap(arr, j, j - 1)
          }
        }
      }
    },
    fastSort (array) {
      this.fsSubFunc(array, 0, array.length)
    },
    fsSubFunc (array, prev, numsize) {
      let nonius = prev
      let j = numsize - 1
      let flag = array[prev]
      if ((numsize - prev) > 1) {
        while (nonius < j) {
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
