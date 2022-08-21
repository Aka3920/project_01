<template>
  <div class="xtx-map">
    <p class="title"><i></i>疫情地图</p>
    <div id="ChinaMap"></div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china'
import api from '@/api/index.js'

export default {
  name: 'XtxMap',
  setup() {
    const cities = reactive([
      {
        city: '内蒙古',
        num: 12
      },
      {
        city: '新疆',
        num: 21
      },
      {
        city: '西藏',
        num: 31
      }
    ])
    const cityList = reactive([])

    // 颜色方法
    const setColor = num => {
      let color = ''
      if (num === 1) {
        color = '#fff'
      } else if (num === 2) {
        color = '#fdfdcf'
      } else {
        color = '#FE9E83'
      }
      return color
    }

    // 构建列表数据
    for (let i = 0; i < cities.length; i++) {
      const temp = {
        name: cities[i].city,
        value: cities[i].num,
        itemStyle: {
          normal: {
            areaColor: setColor(cities[i].num)
          }
        }
      }
      cityList[i] = temp
    }

    // 渲染地图
    onMounted(() => {
      api.getNocvCity({}).then(res => {
        console.log(res)
      })
      // 需要获取到element,所以是onMounted的Hook
      const myChart = echarts.init(document.getElementById('ChinaMap'))
      // 绘制图表
      myChart.setOption({
        // 数据映射
        visualMap: [
          {
            // 第一个 visualMap 组件
            type: 'piecewise', // 定义为连续型 visualMap
            pieces: [
              { min: 0, max: 10, color: '#fff' },
              { min: 11, max: 20, color: '#fdfdcf' },
              { min: 21, max: 30, color: '#FE9E83' },
              { min: 31, max: 40, color: '#999' }
            ]
          }
        ],
        // 提示信息
        tooltip: {},
        // 资源配置
        series: [
          {
            name: '省', // 地图级别
            type: 'map', // 图表类型
            map: 'china',
            roam: false, // 是否允许自动缩放 pc 端关闭
            zoom: 1.2, // 地图缩放比例
            aspectScale: 0.75,
            // 字体
            label: {
              normal: {
                show: true, // 是否自动显示文字
                textStyle: {
                  // 文字样式
                  fontSize: 8,
                  color: 'rgba(0,0,0,0.4)'
                }
              }
            },
            // 样式
            itemStyle: {
              normal: {
                areaColor: 'rgba(0,255,236,0)', // 区域颜色
                borderColor: 'rgba(0,0,0,0.2)' // 边框颜色
              },
              // 阴影效果
              emphasis: {
                areaColor: 'rgba(0,0,0,0.1)',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 10,
                borderWidth: 0,
                shadowColor: 'rgba(225,180,0,0.1)'
              }
            },
            // 信息
            data: cityList
          }
        ]
      })
      window.onresize = function () {
        // 自适应大小
        myChart.resize()
      }
    })
  }
}
</script>

<style lang="less" scoped>
#ChinaMap {
  width: 375px;
  height: 400px;
}

.title {
  border-top: 0.005rem solid #ebebeb;
  border-bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  height: 0.44rem;
  padding: 0 0.16rem;
  font-weight: 500;
  font-size: 0.17rem;
  line-height: 0.44rem;
  background: #fff;
}
.title::before {
  content: '';
  width: 5px;
  height: 20px;
  background: #4169e2;
  margin-right: 10px;
}
</style>
