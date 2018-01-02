let preurl = location.href.indexOf('local') > -1 ? 'http://localhost:8081/' : 'http://101.200.35.148:8081/'
// python用5000接口
let pyUrl = location.href.indexOf('local') > -1 ? 'http://localhost:5000/' : 'http://101.200.35.148:5000/'
export default {
  preurl,
  pyUrl
}
