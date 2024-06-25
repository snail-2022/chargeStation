// 柱状图1模块
(function() {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  // 指定配置和数据
  const dataSource = [
    { name: '铜山区', value: 36 },
    { name: '云龙区', value: 36 },
    { name: '泉山区', value: 33 },
    { name: '鼓楼区', value: 26 },
    { name: '贾汪区', value: 20 },
    { name: '沛县', value: 16 },
    { name: '睢宁县', value: 15 },
    { name: '邳州市', value: 12 }, 
    { name: '新沂市', value: 8 },
    { name: '丰县', value: 7 },
 ];
 let dataSourcemax = 0;
 dataSource.forEach((item) => {
    dataSourcemax += item.value;
 });
 const color = ['#8c55d4', 
 '#77b020', 
 '#6e7d96', 
 '#e6c22f', 
 '#e5566d',
 '#a171e8',
 '#69b8ff', 
 '#94d353', 
 '#8b9dbf', ]
 let salvProMax = [dataSourcemax, dataSourcemax, dataSourcemax, dataSourcemax, dataSourcemax, dataSourcemax, dataSourcemax, dataSourcemax, dataSourcemax, dataSourcemax]
 
 option = {
    // backgroundColor: '#000',
    grid: [
       {
          left: 60,
          top: 5,
          right: 50,
          bottom: 0,
          // containLabel: true,
       },
    ],
    xAxis: [
       {
          gridIndex: 0,
          type: 'value',
          axisLabel: { show: false },
          axisLine: { show: false },
          splitLine: { show: false },
          axisTick: { show: false },
       },
       {
          gridIndex: 0,
          type: 'value',
          max: 200,
          axisLabel: { show: false },
          axisLine: { show: false },
          splitLine: { show: false },
          axisTick: { show: false },
       },
    ],
    yAxis: [
       {
          gridIndex: 0,
          type: 'category',
          inverse: true,
          data: dataSource.map((item) => item.name),
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: { show: false },
          position: 'left',
          axisLabel: {
             width: 80,
             padding: [0, 0, 0, -40],
             align: 'left',
             formatter: (name, index) => {
                return `{value|${name}}`;
             },
             rich: {
                value: {
                   color: '#fff',
                   fontSize: 12,
                   fontWeight: 500,
                },
             },
          },
       },
       {
          gridIndex: 0,
          type: 'category',
          position: 'right',
          inverse: true,
          margin: 20,
          data: dataSource.map((item) => item.name),
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: {
             align: 'right',
             padding: [0, -40, 0, 0],
             formatter: (_, index) => {
                return `{value|${(dataSource[index].value / dataSourcemax * 100).toFixed(2)}%}`;
             },
             rich: {
                value: {
                   color: '#fff',
                   fontSize: 12,
                   fontWeight: 500,
                },
             },
          },
       },
    ],
    series: [
       {
          z: 1,
          type: 'bar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          barWidth: 10,
          data: dataSource.map((item) => item.value),
          silent: true,
          itemStyle: {
             emphasis: {
                barBorderRadius: [0, 20, 20, 0],
             },
             normal: {
                // barBorderRadius: [0, 20, 20, 0],
                barBorderRadius: [30, 30, 30, 30],
                color: function (params) {
                   return color[params.dataIndex]
                },
                // 柱状图上显示数字
                label: {
                  show: true, // 开启显示  
                  position: 'insideTop', // 在内部右侧显示  
                  offset: [0, -5], // 调整标签与柱子边缘的距离  
                  textStyle: {  
                      // 数值样式  
                      fontSize: 12,  
                      color: '#fff',  
                      fontWeight: 500,  
 
                  },  

                },
             },
          },
       },
       {
          z: 3,
          name: '背景',
          type: 'bar',
          barWidth: 8,
          barGap: '-100%',
          data: salvProMax,
          itemStyle: {
             normal: {
                color: function (params) {
                   return color[params.dataIndex]
                },
                opacity: 0.3,
                barBorderRadius: [30, 30, 30, 30],
             },
          },
       },
    ],
 };
 

  // 把配置给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });

  // 数据变化
  // var dataAll = [
  //   { year: "2019", data: [200, 300, 300, 900, 1500, 1200, 600] },
  //   { year: "2020", data: [300, 400, 350, 800, 1800, 1400, 700] }
  // ];

  $(".bar h2 ").on("click", "a", function() {
    option.series[0].data = dataAll[$(this).index()].data;
    myChart.setOption(option);
  });
})();

// // 折线图定制
// (function() {
//   // 基于准备好的dom，初始化echarts实例
//   var myChart = echarts.init(document.querySelector(".line .chart"));

//   // (1)准备数据
//   var data = {
//     year: [
//       [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
//     ]
//   };

//   // 2. 指定配置和数据
//   var option = {
//     color: ["#00f2f1"],
//     tooltip: {
//       // 通过坐标轴来触发
//       trigger: "axis"
//     },
//     legend: {
//       // 距离容器10%
//       right: "10%",
//       // 修饰图例文字的颜色
//       textStyle: {
//         color: "#4c9bfd"
//       }
//       // 如果series 里面设置了name，此时图例组件的data可以省略
//       // data: ["邮件营销", "联盟广告"]
//     },
//     grid: {
//       top: "20%",
//       left: "3%",
//       right: "4%",
//       bottom: "3%",
//       show: true,
//       borderColor: "#012f4a",
//       containLabel: true
//     },

//     xAxis: {
//       type: "category",
//       boundaryGap: false,
//       data: [
//         "1月",
//         "2月",
//         "3月",
//         "4月",
//         "5月",
//         "6月",
//         "7月",
//         "8月",
//         "9月",
//         "10月",
//         "11月",
//         "12月"
//       ],
//       // 去除刻度
//       axisTick: {
//         show: false
//       },
//       // 修饰刻度标签的颜色
//       axisLabel: {
//         color: "rgba(255,255,255,.7)"
//       },
//       // 去除x坐标轴的颜色
//       axisLine: {
//         show: false
//       }
//     },
//     yAxis: {
//       type: "value",
//       // 去除刻度
//       axisTick: {
//         show: false
//       },
//       // 修饰刻度标签的颜色
//       axisLabel: {
//         color: "rgba(255,255,255,.7)"
//       },
//       // 修改y轴分割线的颜色
//       splitLine: {
//         lineStyle: {
//           color: "#012f4a"
//         }
//       }
//     },
//     series: [
//       {
//         name: "使用人数",
//         type: "line",
//         stack: "总量",
//         // 是否让线条圆滑显示
//         smooth: true,
//         data: data.year[0]
//       },
//     ]
//   };
//   // 3. 把配置和数据给实例对象
//   myChart.setOption(option);

//   // 重新把配置好的新数据给实例对象
//   myChart.setOption(option);
//   window.addEventListener("resize", function() {
//     myChart.resize();
//   });
// })();

// 饼形图定制
// 折线图定制
// (function() {
//   // 基于准备好的dom，初始化echarts实例
//   var myChart = echarts.init(document.querySelector(".pie .chart"));

//   option = {
//     tooltip: {
//       trigger: "item",
//       formatter: "{a} <br/>{b}: {c} ({d}%)",
//       position: function(p) {
//         //其中p为当前鼠标的位置
//         return [p[0] + 10, p[1] - 10];
//       }
//     },
//     legend: {
//       top: "90%",
//       itemWidth: 10,
//       itemHeight: 10,
//       data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
//       textStyle: {
//         color: "rgba(255,255,255,.5)",
//         fontSize: "12"
//       }
//     },
//     series: [
//       {
//         name: "年龄分布",
//         type: "pie",
//         center: ["50%", "42%"],
//         radius: ["40%", "60%"],
//         color: [
//           "#065aab",
//           "#066eab",
//           "#0682ab",
//           "#0696ab",
//           "#06a0ab",
//           "#06b4ab",
//           "#06c8ab",
//           "#06dcab",
//           "#06f0ab"
//         ],
//         label: { show: false },
//         labelLine: { show: false },
//         data: [
//           { value: 1, name: "0岁以下" },
//           { value: 4, name: "20-29岁" },
//           { value: 2, name: "30-39岁" },
//           { value: 2, name: "40-49岁" },
//           { value: 1, name: "50岁以上" }
//         ]
//       }
//     ]
//   };

//   // 使用刚指定的配置项和数据显示图表。
//   myChart.setOption(option);
//   window.addEventListener("resize", function() {
//     myChart.resize();
//   });
// })();
// 学习进度柱状图模块
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".bar1 .chart"));

  var data = [52.5, 28.5, 9, 10];
  var titlename = ["使用中", "空闲中", "损坏中", "维修中"];
  var valdata = [105, 57, 18, 20];
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448"];
  option = {
    //图标位置
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%"
    },
    xAxis: {
      show: false
    },
    yAxis: [
      {
        show: true,
        data: titlename,
        inverse: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#fff",

          rich: {
            lg: {
              backgroundColor: "#339911",
              color: "#fff",
              borderRadius: 15,
              // padding: 5,
              align: "center",
              width: 15,
              height: 15
            }
          }
        }
      },
      {
        show: true,
        inverse: true,
        data: valdata,
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#fff"
          }
        }
      }
    ],
    series: [
      {
        name: "条",
        type: "bar",
        yAxisIndex: 0,
        data: data,
        barCategoryGap: 50,
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color: function(params) {
              var num = myColor.length;
              return myColor[params.dataIndex % num];
            }
          }
        },
        label: {
          normal: {
            show: true,
            position: "inside",
            formatter: "{c}%"
          }
        }
      },
      {
        name: "框",
        type: "bar",
        yAxisIndex: 1,
        barCategoryGap: 50,
        data: [100, 100, 100, 100],
        barWidth: 15,
        itemStyle: {
          normal: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
// 折线图 优秀作品
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line2 .chart"));

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#dddc6b"
        }
      }
    },
    legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },

    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },

        data: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30"
        ]
      },
      {
        axisPointer: { show: false },
        axisLine: { show: false },
        position: "bottom",
        offset: 20
      }
    ],

    yAxis: [
      {
        type: "value",
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },

        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "时长",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#0184d5",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)"
                },
                // {
                //   offset: 0.8,
                //   color: "rgba(1, 132, 213, 0.1)"
                // }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#0184d5",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: [
          810,
          742,
          915,
          1185,
          1211,
          1352,
          800,
          750,
          781,
          850,
          1120,
          840,
          730,
          840,
          930,
          940,
          980,
          1140,
          1030,
          1600,
          1720,
          1540,
          1420,
          1240,
          1930,
          2160,
          1200,
          740,
          920,
          1200
        ]
  //     },
  //     {
  //       name: "转发量",
  //       type: "line",
  //       smooth: true,
  //       symbol: "circle",
  //       symbolSize: 5,
  //       showSymbol: false,
  //       lineStyle: {
  //         normal: {
  //           color: "#00d887",
  //           width: 2
  //         }
  //       },
  //       areaStyle: {
  //         normal: {
  //           color: new echarts.graphic.LinearGradient(
  //             0,
  //             0,
  //             0,
  //             1,
  //             [
  //               {
  //                 offset: 0,
  //                 color: "rgba(0, 216, 135, 0.4)"
  //               },
  //               {
  //                 offset: 0.8,
  //                 color: "rgba(0, 216, 135, 0.1)"
  //               }
  //             ],
  //             false
  //           ),
  //           shadowColor: "rgba(0, 0, 0, 0.1)"
  //         }
  //       },
  //       itemStyle: {
  //         normal: {
  //           color: "#00d887",
  //           borderColor: "rgba(221, 220, 107, .1)",
  //           borderWidth: 12
  //         }
  //       },
  //       data: [
  //         50,
  //         30,
  //         50,
  //         60,
  //         10,
  //         50,
  //         30,
  //         50,
  //         60,
  //         40,
  //         60,
  //         40,
  //         80,
  //         30,
  //         50,
  //         60,
  //         10,
  //         50,
  //         30,
  //         70,
  //         20,
  //         50,
  //         10,
  //         40,
  //         50,
  //         30,
  //         70,
  //         20,
  //         50,
  //         10,
  //         40
  //       ]
       }
      ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line1 .chart"));

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#dddc6b"
        }
      }
    },
    legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },

    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },

        data: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "11",
          "12",
        ]
      },
      {
        axisPointer: { show: false },
        axisLine: { show: false },
        position: "bottom",
        offset: 20
      }
    ],

    yAxis: [
      {
        type: "value",
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },

        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "时长",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#0184d5",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)"
                },
                // {
                //   offset: 0.8,
                //   color: "rgba(1, 132, 213, 0.1)"
                // }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#0184d5",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: [
          32740,
          29982,
          24397,
          25452,
          27500,
          31085,
          36375,
          37025,
          36921,
          35421,
          34892,
          35657,
         
        ]
       }
      ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
// // 点位分布统计模块
// (function() {
//   // 1. 实例化对象
//   var myChart = echarts.init(document.querySelector(".pie1  .chart"));
//   // 2. 指定配置项和数据
//   var option = {
//     legend: {
//       top: "90%",
//       itemWidth: 10,
//       itemHeight: 10,
//       textStyle: {
//         color: "rgba(255,255,255,.5)",
//         fontSize: "12"
//       }
//     },
//     tooltip: {
//       trigger: "item",
//       formatter: "{a} <br/>{b} : {c} ({d}%)"
//     },
//     // 注意颜色写的位置
//     color: [
//       "#006cff",
//       "#60cda0",
//       "#ed8884",
//       "#ff9f7f",
//       "#0096ff",
//       "#9fe6b8",
//       "#32c5e9",
//       "#1d9dff"
//     ],
//     series: [
//       {
//         name: "使用情况",
//         type: "pie",
//         // 如果radius是百分比则必须加引号
//         radius: ["10%", "70%"],
//         center: ["50%", "42%"],
//         roseType: "radius",
//         data: [
//           { value: 20, name: "云龙" },
//           { value: 26, name: "鼓楼" },
//           { value: 28, name: "泉山" },
//           { value: 36, name: "铜山" },
//           { value: 14, name: "贾汪" },
   
//         ],
//         // 修饰饼形图文字相关的样式 label对象
//         label: {
//           fontSize: 10
//         },
//         // 修饰引导线样式
//         labelLine: {
//           // 连接到图形的线长度
//           length: 10,
//           // 连接到文字的线长度
//           length2: 10
//         }
//       }
//     ]
//   };

//   // 3. 配置项和数据给我们的实例化对象
//   myChart.setOption(option);
//   // 4. 当我们浏览器缩放的时候，图表也等比例缩放
//   window.addEventListener("resize", function() {
//     // 让我们的图表调用 resize这个方法
//     myChart.resize();
//   });
// })();
//销售
// (function () {
//   var data = {
//       day365: { orders: '20,301,987', amount: '99834' },
//       day90: { orders: '301,987', amount: '9834' },
//       day30: { orders: '1,987', amount: '3834' },
//       day1: { orders: '987', amount: '834' }
//   }
//   //点击事件
//   $('.order').on('click', '.filter a', function () {
//       //点击之后加类名
//       $(this).addClass('active').siblings().removeClass('active');
//       // 先获取点击a的 data-key自定义属性
//       var key = $(this).attr('data-key');
//       //获取自定义属性
//       // data{}==>data.shuxing data['shuxing]
//       key = data[key];//
//       $('.order .item h4:eq(0)').text(key.orders);
//       $('.order .item h4:eq(1)').text(key.amount);
//   });
//   //定时器
//   var index = 0;
//   var aclick = $('.order a');
//   setInterval(function () {
//       index++;
//       if (index > 3) {
//           index = 0;
//       }
//       //每san秒调用点击事件
//       aclick.eq(index).click();
//   }, 3000);
// })();







// (function() {
  
//   // 基于准备好的dom，初始化echarts实例
//   var myChart = echarts.init(document.querySelector(".line1 .chart"));
// let angle = 0; //角度，用来做简单的动画效果的
// let value = 10;
// var timerId;
// option = {  
//   backgroundColor: 'transparent',
//     title: {
//         text: '{a|' + value + '}{c|%}',
//         x: 'center',
//         y: 'center',
//         textStyle: {
//             rich: {
//                 a: {
//                     fontSize: 48,
//                     color: '#29EEF3'
//                 },

//                 c: {
//                     fontSize: 20,
//                     color: '#ffffff',
//                     // padding: [5,0]
//                 }
//             }
//         }
//     },

//     series: [
//         // 紫色
//         {
//             name: "ring5",
//             type: 'custom',
//             coordinateSystem: "none",
//             renderItem: function(params, api) {
//                 return {
//                     type: 'arc',
//                     shape: {
//                         cx: api.getWidth() / 2,
//                         cy: api.getHeight() / 2,
//                         r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
//                         startAngle: (0 + angle) * Math.PI / 180,
//                         endAngle: (90 + angle) * Math.PI / 180
//                     },
//                     style: {
//                         stroke: "#8383FA",
//                         fill: "transparent",
//                         lineWidth: 1.5
//                     },
//                     silent: true
//                 };
//             },
//             data: [0]
//         }, {
//             name: "ring5", //紫点
//             type: 'custom',
//             coordinateSystem: "none",
//             renderItem: function(params, api) {
//                 let x0 = api.getWidth() / 2;
//                 let y0 = api.getHeight() / 2;
//                 let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6;
//                 let point = getCirlPoint(x0, y0, r, (90 + angle))
//                 return {
//                     type: 'circle',
//                     shape: {
//                         cx: point.x,
//                         cy: point.y,
//                         r: 4
//                     },
//                     style: {
//                         stroke: "#8450F9", //绿
//                         fill: "#8450F9"
//                     },
//                     silent: true
//                 };
//             },
//             data: [0]
//         },
//         // 蓝色

//         {
//             name: "ring5",
//             type: 'custom',
//             coordinateSystem: "none",
//             renderItem: function(params, api) {
//                 return {
//                     type: 'arc',
//                     shape: {
//                         cx: api.getWidth() / 2,
//                         cy: api.getHeight() / 2,
//                         r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
//                         startAngle: (180 + angle) * Math.PI / 180,
//                         endAngle: (270 + angle) * Math.PI / 180
//                     },
//                     style: {
//                         stroke: "#4386FA",
//                         fill: "transparent",
//                         lineWidth: 1.5
//                     },
//                     silent: true
//                 };
//             },
//             data: [0]
//         },
//         {
//             name: "ring5", // 蓝色
//             type: 'custom',
//             coordinateSystem: "none",
//             renderItem: function(params, api) {
//                 let x0 = api.getWidth() / 2;
//                 let y0 = api.getHeight() / 2;
//                 let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6;
//                 let point = getCirlPoint(x0, y0, r, (180 + angle))
//                 return {
//                     type: 'circle',
//                     shape: {
//                         cx: point.x,
//                         cy: point.y,
//                         r: 4
//                     },
//                     style: {
//                         stroke: "#4386FA", //绿
//                         fill: "#4386FA"
//                     },
//                     silent: true
//                 };
//             },
//             data: [0]
//         },

//         {
//             name: "ring5",
//             type: 'custom',
//             coordinateSystem: "none",
//             renderItem: function(params, api) {
//                 return {
//                     type: 'arc',
//                     shape: {
//                         cx: api.getWidth() / 2,
//                         cy: api.getHeight() / 2,
//                         r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
//                         startAngle: (270 + -angle) * Math.PI / 180,
//                         endAngle: (40 + -angle) * Math.PI / 180
//                     },
//                     style: {
//                         stroke: "#0CD3DB",
//                         fill: "transparent",
//                         lineWidth: 1.5
//                     },
//                     silent: true
//                 };
//             },
//             data: [0]
//         },
//         // 橘色

//         {
//             name: "ring5",
//             type: 'custom',
//             coordinateSystem: "none",
//             renderItem: function(params, api) {
//                 return {
//                     type: 'arc',
//                     shape: {
//                         cx: api.getWidth() / 2,
//                         cy: api.getHeight() / 2,
//                         r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
//                         startAngle: (90 + -angle) * Math.PI / 180,
//                         endAngle: (220 + -angle) * Math.PI / 180
//                     },
//                     style: {
//                         stroke: "#FF8E89",
//                         fill: "transparent",
//                         lineWidth: 1.5
//                     },
//                     silent: true
//                 };
//             },
//             data: [0]
//         }, {
//             name: "ring5",
//             type: 'custom',
//             coordinateSystem: "none",
//             renderItem: function(params, api) {
//                 let x0 = api.getWidth() / 2;
//                 let y0 = api.getHeight() / 2;
//                 let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
//                 let point = getCirlPoint(x0, y0, r, (90 + -angle))
//                 return {
//                     type: 'circle',
//                     shape: {
//                         cx: point.x,
//                         cy: point.y,
//                         r: 4
//                     },
//                     style: {
//                         stroke: "#FF8E89", //粉
//                         fill: "#FF8E89"
//                     },
//                     silent: true
//                 };
//             },
//             data: [0]
//         }, {
//             name: "ring5", //绿点
//             type: 'custom',
//             coordinateSystem: "none",
//             renderItem: function(params, api) {
//                 let x0 = api.getWidth() / 2;
//                 let y0 = api.getHeight() / 2;
//                 let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
//                 let point = getCirlPoint(x0, y0, r, (270 + -angle))
//                 return {
//                     type: 'circle',
//                     shape: {
//                         cx: point.x,
//                         cy: point.y,
//                         r: 4
//                     },
//                     style: {
//                         stroke: "#0CD3DB", //绿
//                         fill: "#0CD3DB"
//                     },
//                     silent: true
//                 };
//             },
//             data: [0]
//         }, {
//             name: '吃猪肉频率',
//             type: 'pie',
//             radius: ['52%', '40%'],
//             silent: true,
//             clockwise: true,
//             startAngle: 90,
//             z: 0,
//             zlevel: 0,
//             label: {
//                 normal: {
//                     position: "center",

//                 }
//             },
//             data: [{
//                     value: value,
//                     name: "",
//                     itemStyle: {
//                         normal: {
//                             color: { // 完成的圆环的颜色
//                                 colorStops: [{
//                                         offset: 0,
//                                         color: '#A098FC' // 0% 处的颜色
//                                     },
//                                     {
//                                         offset: 0.3,
//                                         color: '#4386FA' // 0% 处的颜色
//                                     },
//                                     {
//                                         offset: 0.6,
//                                         color: '#4FADFD' // 0% 处的颜色
//                                     },
//                                     {
//                                         offset: 0.8,
//                                         color: '#0CD3DB' // 100% 处的颜色
//                                     }, {
//                                         offset: 1,
//                                         color: '#646CF9' // 100% 处的颜色
//                                     }
//                                 ]
//                             },
//                         }
//                     }
//                 },
//                 {
//                     value: 100 - value,
//                     name: "",
//                     label: {
//                         normal: {
//                             show: false
//                         }
//                     },
//                     itemStyle: {
//                         normal: {
//                             color: "#173164"
//                         }
//                     }
//                 }
//             ]
//         },
//         {
//             name: '吃猪肉频率',
//             type: 'pie',
//             radius: ['32%', '35%'],
//             silent: true,
//             clockwise: true,
//             startAngle: 270,
//             z: 0,
//             zlevel: 0,
//             label: {
//                 normal: {
//                     position: "center",

//                 }
//             },
//             data: [{
//                     value: value,
//                     name: "",
//                     itemStyle: {
//                         normal: {
//                             color: { // 完成的圆环的颜色
//                                 colorStops: [{
//                                     offset: 0,
//                                     color: '#00EDF3' // 0% 处的颜色
//                                 }, {
//                                     offset: 1,
//                                     color: '#646CF9' // 100% 处的颜色
//                                 }]
//                             },
//                         }
//                     }
//                 },
//                 {
//                     value: 100 - value,
//                     name: "",
//                     label: {
//                         normal: {
//                             show: false
//                         }
//                     },
//                     itemStyle: {
//                         normal: {
//                             color: "#173164"
//                         }
//                     }
//                 }
//             ]
//         },

//     ]
// };

// //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
// function getCirlPoint(x0, y0, r, angle) {
//     let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
//     let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
//     return {
//         x: x1,
//         y: y1
//     }
// }

// function draw() {
//     angle = angle + 3
//     myChart.setOption(option, true)
//     //window.requestAnimationFrame(draw);
// }
// if (timerId) {
//     clearInterval(timerId);
// }
// timerId = setInterval(function() {
//     //用setInterval做动画感觉有问题
//     draw()
// }, 100);
 
// if(option){
// myChart.setOption(option);
// }
// myChart.setOption(option);
// window.addEventListener("resize", function() {
//   myChart.resize();
// });
// })();