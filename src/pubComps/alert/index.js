import Vue from 'vue'
import AlertConstructor from './index.vue'
class AlertComp {
  constructor (options) {
    let newdiv = document.createElement('div')
    newdiv.id = 'alert-pop'
    document.body.appendChild(newdiv)

    let instance = new Vue({
      el: '#alert-pop',
      template: '<AlertConstructor :options=options></AlertConstructor>',
      components: {
        AlertConstructor
      },
      data: { options }
    })
    return instance
    // instance.$mount('#alert-pop')
  }
}
export default AlertComp
