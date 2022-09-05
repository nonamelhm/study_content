import 'leaflet/dist/leaflet.css'
import '@/assets/css/Leaflet.PolylineMeasure.css'
import '@/assets/css/control.playback.css'
import L from 'leaflet'
import "@/assets/js/control.trackplayback.js" //轨迹回放
import "@/assets/js/leaflet.trackplayback.js" //轨迹回放

import '@/assets/js/Leaflet.PolylineMeasure.js'
// 轨迹回放
import '@/assets/js/LeafletPlayback.js'
import demoTracks from '@/assets/js/demo-tracks.js' //数据，正常应该是从接口获取进行数据整理
import playBackData from '../assets/playback1.json'
import playBackData2 from '../assets/playback2.json'
// 地图操作mapMixin
export default {
  data() {
    return {
      lat: 0,
      lng: 0,
      isClick: false,
      isMeasure: false,
      polylineMeasure: null,
      layer: null,
      allLayers: [],
      isPlayback: false,
      isPlayback2: false
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
          this.layer = L.marker([e.latlng.lat, e.latlng.lng], {
            icon: myIcon
          }).addTo(map);
          this.allLayers.push(this.layer) //存下所有layers
          map.setView([e.latlng.lat, e.latlng.lng]) // 移动到中心
        })
      } else {
        map.removeEventListener("click")
        this.allLayers.forEach(item => { //清除绘制的所有点的图层
          item.remove();
        })
        this.isClick = false
      }
    },
    _measureDistance(map, id) { //测量距离
      if (!this.isMeasure) {
        if (!this.polylineMeasure) {
          L.control.scale({
            maxWidth: 240,
            metric: true,
            imperial: false,
            position: 'bottomleft'
          }).addTo(map);
          this.polylineMeasure = L.control.polylineMeasure({
            position: 'topleft',
            unit: 'kilometres', //最小单位
            showBearings: true,
            clearMeasurementsOnStop: false,
            showClearControl: true,
            showUnitControl: true,
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
        }
        //开始测距
        this.$nextTick(() => { //点击就绘制
          // 隐藏侧边栏目那些工具UI
          document.getElementsByClassName('leaflet-bar').forEach((item) => {
            item.style.display = 'none'
          })
          document.getElementById(`polyline-measure-control`).click()
          this.isMeasure = true
        })
      } else { //取消测量
        this.$nextTick(() => { //清除测量绘制
          // 隐藏清除
          document.getElementById(id).getElementsByClassName('polyline-measure-clearControl')[0].click()
          this.isMeasure = false
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
    },
    _playback(map) {

      var basemapLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/github.map-xgq2svrz/{z}/{x}/{y}.png');

      // Center map and default zoom level
      map.setView([44.61131534, -123.4726739], 9);

      // Adds the background layer to the map
      map.addLayer(basemapLayer);

      // =====================================================
      // =============== Playback ============================
      // =====================================================
      // Playback options
      if (!this.isPlayback) {
        var playbackOptions = {
          playControl: true,
          dateControl: true,
          sliderControl: true
        };
        // Initialize playback
        console.log(demoTracks)
        console.log('----------------')

        var playback = L.playback(map, demoTracks, null, playbackOptions);
        this.isPlayback = true
      } else {
        this.isPlayback = false
      }
    },
    _playBack2(map) { //回放轨迹
      let res = playBackData
      map.setView([34.36384353883067, 134.09362792968753], 8); //改变中心
      const trackplayback = L.trackplayback(res, map, {
        targetOptions: {
          useImg: true,
          imgUrl: require('@/assets/logo.png')
        },
         trackLineOptions: {
            // whether draw track line
            isDraw: false,
            stroke: true,
            color: "#00aa00",
            weight: 2,
            fill: false,
            fillColor: '#000',
            opacity: 0.3
          },
      })
      const trackplaybackControl = L.trackplaybackcontrol(trackplayback);
      trackplaybackControl.addTo(map);
      trackplayback.on('tick', e => {
        // console.log(e.time)
      }, this)
      //看待地图上的控件,隐藏它们写自己的样式，然后click就是相应的控件click

      // 第二条轨迹  为了不同颜色
      let res2 = playBackData2
      const trackplayback2 = L.trackplayback(res2, map, {
          clockOptions: {
            // the default speed
            // caculate method: fpstime * Math.pow(2, speed - 1)
            // fpstime is the two frame time difference
            speed: 13,
            // the max speed
            maxSpeed: 65
          },
        targetOptions: {
          useImg: true,
          imgUrl: require('@/assets/ship.png')
        },
         trackLineOptions: {
            // whether draw track line
            isDraw: false,
            stroke: true,
            color: "#ff0000",
            weight: 2,
            fill: false,
            fillColor: '#000',
            opacity: 0.3
          },
      })
      const trackplaybackControl2 = L.trackplaybackcontrol(trackplayback2);
      trackplaybackControl2.addTo(map)
    },
  }
}
