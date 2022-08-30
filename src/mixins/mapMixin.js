import 'leaflet/dist/leaflet.css'
import '@/assets/css/Leaflet.PolylineMeasure.css'
import L from 'leaflet'
import '@/assets/js/Leaflet.PolylineMeasure.js'
// 地图操作mapMixin
export default {
  data() {
    return {
      lat: 0,
      lng: 0,
      isClick: false,
      isMeasure: false,
      polylineMeasure: null
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
      if (!this.isClick) {
        this.isClick = true
        map.addEventListener('click', (e) => { //点击事件
          L.marker([e.latlng.lat, e.latlng.lng], {
            icon: myIcon
          }).addTo(map);
          map.setView([e.latlng.lat, e.latlng.lng]) // 移动到中心
        })
      } else {
        map.removeEventListener("click")
        this.isClick = false
      }
    },
    _measureDistance(map,id) { //测量距离
    if(!this.isMeasure){
      this.isMeasure = true
      L.control.scale({
        maxWidth: 240,
        metric: true,
        imperial: false,
        position: 'bottomleft'
      }).addTo(map);
      this.polylineMeasure = L.control.polylineMeasure({
        position: 'topleft',
        unit: 'kilometres', //最小单位
        // showBearings: true,
        clearMeasurementsOnStop: false,
        // showClearControl: true,
        // showUnitControl: true,
        bearingTextIn: '起点',
        bearingTextOut: '终点',
        tooltipTextFinish: '单击并<b>拖动到移动点</b><br>',
        tooltipTextDelete: '<b>按shift键，然后单击删除</b>',
        unitControlLabel: {
          metres: '米',
          kilometres: '千米',
          feet: '英尺',
          landmiles: '英里',
          nauticalmiles: '海里'
        },
      })
      this.polylineMeasure.addTo(map);
       //开始测距
       this.$nextTick(()=>{  //点击就绘制
         document.getElementById(`polyline-measure-control`).click()
       })
      }else{   //取消测量
        this.isMeasure = false
       this.$nextTick(()=>{  //清楚测量绘制
        document.getElementById(id).getElementsByClassName('polyline-measure-clearControl')[0].click()
      })
      }
      // 监听画线状态 仅是学习
      // map.on('polylinemeasure:start', currentLine => {
      //   console.log('开始start')
      //   console.log(currentLine)
      // });

      // map.on('polylinemeasure:toogle', e => {
      //   console.log(e)
      // });

      // map.on('polylinemeasure:resume', currentLine => {
      //   console.log('resume')
      //   console.log(currentLine)
      // });
      // map.on('polylinemeasure:finish', currentLine => {
      //   console.log('finish')
      //   console.log(currentLine)
      // });
      // map.on('polylinemeasure:change', currentLine => {});
      // map.on('polylinemeasure:clear', e => {
      //   console.log("清除clear")
      //   console.log(e)
      //   console.log("全部画线被清除")
      // });
      // map.on('polylinemeasure:add', e => { /* e.latlng */ });
      // map.on('polylinemeasure:insert', e => { /* e.latlng */ });
      // map.on('polylinemeasure:move', e => { /* e.latlng ; e.sourceTarget._latlng */ });
      // map.on('polylinemeasure:remove', e => { /* e.latlng ; e.sourceTarget._latlng */ });



    }
  }
}
