<template>
    <div id="charts1">
        <div id="myChart1" :style="{width:'500px',height:'300px'}"></div> 
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
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
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
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
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
              "#Ff7"
            ],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 50, name: "" },
              { value: 310, name: "邮件营销" },
              { value: 50, name: "" },
              { value: 234, name: "联盟广告" },
              { value: 50, name: "" },
              { value: 135, name: "视频广告" },
              { value: 50, name: "" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      });
    }
  }
};
</script>