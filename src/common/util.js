function promiseCatch (err) {
  this.$notify.error({
    title: '错误',
    message: err,
    duration: '1800'
  });
}

function successHint (title = '操作成功', des, duration = '1800', vm) {
	this.$notify({
    title,
    message: des,
    type: 'success',
    duration
  });
}

export default {
  promiseCatch,
  successHint
}
