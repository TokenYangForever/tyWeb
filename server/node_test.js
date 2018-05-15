const { exec } = require('child_process')
exec(`python3 python_script/test.py 参数1`, (err, stdout, stderr) => {
  if (err) {
    console.error('err:' + err)
    return
  }
  if (stderr) {
  	console.error('stderr:' + stderr)
    return
  }
  console.log('python脚本的标准输出:' + stdout)
})