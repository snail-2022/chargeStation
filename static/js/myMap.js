(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".map .chart"));
  // 2. 指定配置和数据
  // 2. 指定配置和数据
var outname = [
   "南海诸岛",
   "北京",
   "天津",
   "上海",
   "重庆",
   "河北",
   "河南",
   "云南",
   "辽宁",
   "黑龙江",
   "湖南",
   "安徽",
   "山东",
   "新疆",
   "江苏",
   "浙江",
   "江西",
   "湖北",
   "广西",
   "甘肃",
   "山西",
   "内蒙古",
   "陕西",
   "吉林",
   "福建",
   "贵州",
   "广东",
   "青海",
   "西藏",
   "四川",
   "宁夏",
   "海南",
   "台湾",
   "香港",
   "澳门",
];
var outvalue = [
   0, 524, 113, 140, 75, 13, 83, 11, 19, 15, 69, 260, 39, 94, 31, 104, 36,
   1052, 33, 347, 9, 157, 22, 4, 18, 5, 398, 41, 210, 484, 404, 22, 43, 25,
   225,
];
var outdata = outname.map((item, index) => {
    

   return {
      name: item,
      value: outvalue[index]
   }

})
var maxValue = Math.max(...(outdata.map(item => { return item.value })));
let option = {
   tooltip: {
      show: true,
      formatter: function (params) {
         return (
            "&nbsp;&nbsp;" +
            params.name +
            "&nbsp;&nbsp;&nbsp;" +
            params.value +
            "家&nbsp;&nbsp;"
         );
      },
   },

   visualMap: {
      type: "continuous",
      text: ["", ""],
      showLabel: true,
      left: "0",
      min: 0,
      max: maxValue,
      itemWidth: 10, //图形的宽度，即长条的宽度
      itemHeight: 80, //图形的高度，即长条的高度。
      seriesIndex: [0],
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']

      },

      outOfRange: {
         color: ["#999999"],
      },
      splitNumber: 0,
   },
   geo: {
      map: "china",
      show: true,
      aspectScale: 0.75,
      zoom: 1.2,
      roam: false,
      label: {
         emphasis: {
            show: false,
         },
      },
   },
   series: [
      {
         type: "map",
         map: "china",
         aspectScale: 0.75,
         zoom: 1.2,
         label: {
            normal: {
               show: true,
               color: "#FFFFFF",
               fontWeight: 500,
            },
            emphasis: {
               show: true,
            },
         },
         itemStyle: {
            normal: {
               borderColor: "#fff",
               borderWidth: 1,
            },
            emphasis: {
               areaColor: "#867BFF",
            },
         },
         emphasis: {
            itemStyle: {
               areaColor: null,
               borderWidth: 3,
               shadowColor: "rgba(0,0,0,.2)",
               shadowOffsetX: 5,
               shadowOffsetY: 5,
            },
         },
         animation: false,
         data: outdata,
      },
   ],
};
   
       myChart.setOption(option);
       window.addEventListener("resize",function(){
           myChart.resize();
       });


   }
)();
