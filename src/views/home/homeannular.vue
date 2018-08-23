<style>
</style>

<template>
    <div class="home-left">
        <div class="home-title">
          <p> </p>
          <i>备份任务量</i>
          <em>55</em>    
        </div>
        <div class="home-content">
          <p>备份数据量</p>
            <div id="myChart1"  :style="{width:'500px',height:'300px'}" ></div> 
             <p> {{lubin}}</p>
             <div class="home-details">

          </div>
        </div>
    </div>
</template>
<script >
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  props: {
    lubin: String
  },
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      mss: ""
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart.setOption({
        legend: {
          orient: "vertical",
          x: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["65%", "75%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            color: [
              "#fd7549",
              "#fff",
              "#fD2311",
              "#fff",
              "#232",
              "#fff",
              "#F67",
              "#fff",
              "#Ff7",
              "#fff"
            ],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 20, name: "" },
              { value: 310, name: "邮件营销" },
              { value: 20, name: "" },
              { value: 234, name: "联盟广告" },
              { value: 20, name: "" },
              { value: 135, name: "视频广告" },
              { value: 20, name: "" },
              { value: 1548, name: "搜索引擎" },
              { value: 20, name: "" }
            ]
          }
        ]
      });
    }
  }
};
</script>