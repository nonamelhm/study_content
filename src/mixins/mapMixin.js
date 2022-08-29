import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// 地图操作mapMixin
export default {
  data() {
    return {
      lat: 0,
      lng: 0
    }
  },
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
      }).setView([24, 110], 6)
      return map
    },
    _getLatLng(map) { //得到经纬度
      map.addEventListener("mousemove", (e) => {
        this.lat = e.latlng.lat.toFixed(5);
        this.lng = e.latlng.lng.toFixed(5);
      })
    },
    _getZoom(map) { //得到层级
      map.addEventListener("zoom", (e) => { //监听放大缩放事件
        console.log(e)
        console.log("当前缩放层级：")
        console.log(map.getZoom())
      })
    },
    _drawPoint(map, iconUrl) { //画点 方式点击画标注点
      var myIcon = L.icon({ //自定义图片
        iconUrl: iconUrl,
        iconSize: [20, 20]
      });
      map.addEventListener('click', (e) => { //点击事件
        L.marker([e.latlng.lat, e.latlng.lng], {
          icon: myIcon
        }).addTo(map);
      })
    }
  }
}
