# bootvue

> A Vue.js project

线上地址：http://101.200.35.148/dist/#/

## 一个自己写着玩的vue demo
### 目前实现功能：
* todolist：查看\添加\修改状态，链接node服务器mysql数据库
* 图片预览\上传至服务器，暂时只支持单图片通过input上传，粘贴/拖拽上传有过尝试。ps: html5的FileReader特性可直接把图片转化为base64编码
* markdown编辑器，使用[marked](https://github.com/chjj/marked)
* 排序算法演示器，以柱状图形式表示数组，设置不同排序算法，可观察排序过程的具体演示，可设置speed速度
* 使用socket.io实现，实时聊天室；随机昵称、随机聊天颜色