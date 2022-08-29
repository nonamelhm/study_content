import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
 // 地图操作mapMixin
 export default {
   methods: {
     _createMap(id, options) {
      var tiandituI = L.layerGroup([ //天地图街道 变成t{s}不行??
        L.tileLayer(
          'http://t4.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=5bb740ffd3a80fb3963e022454eca6e2'),
        L.tileLayer(
          'http://t4.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=5bb740ffd3a80fb3963e022454eca6e2')
      ])
      // 初始化地图信息
      var map = L.map(id, {
        layers: [tiandituI],
        maxZoom: 18,
        zoom: 3,
        zoomControl: false
      }).setView([24,110],6)
       return map
     }
   }
 }
