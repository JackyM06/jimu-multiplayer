# JIMU协同编辑原型

## 一、数据传输方案

- 网络拓扑: 内网分布式
- P2P: WebRTC
- Signal: WebSocket

## 二、协同算法指导

- CRDTs

## 三、项目结构划分

- jimu-signaling-server
- jimu-stun-server
- jimu-server: 积木server简易模型，用于保存、获取
- jimu-editor: 编辑器交互简易模型，用于修改组件树、属性等
- jimu-P2P-WebWorker: CRDT处理和P2P连接
