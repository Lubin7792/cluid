<template>
    <div id="charts2">
        <div id="myChart2" :style="{width:'500px',height:'300px'}"></div> 
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
      let myChart = echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center"
        },
        
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        color: ["#fd7549", "#e3e3e3"],
        
         
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            
            data: [
              { value: 335, name: "已使用" },
              {
                value: 310,
                name: "未使用"
              }
            ],
            itemStyle: {
              color:'red',
              emphasis: {
                shadowBlur: 100,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              
              }
               
            
            }
          }
        ]
      });
    }
  }
};
</script>