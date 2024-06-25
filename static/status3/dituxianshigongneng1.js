// 以下是地图显示部分的展示
//比例尺
var scale = new AMap.Scale(),
//放大缩小
toolBar = new AMap.ToolBar({
    position: {
        bottom: '20px',
        right: '30.2px',
    }
}),
//视角转盘
controlBar = new AMap.ControlBar({
    position: {
        bottom: '115px',
        right: '0',
    }
}),
//定位
geolocation = new AMap.Geolocation({
    position: {
        bottom: '85px',
        right: '30px',
    }
}),
//路况
maptype = new AMap.MapType({
    position: {
        top: '0px',
        right: '0px',
    }
}),
//地图加载
map = new AMap.Map("container", {
    viewMode: '3D',
    zoom: 16,
    pitch: 30,
    center: [117.14509,34.214571],
    resizeEnable: true,
    
});
map.addControl(scale);
map.addControl(toolBar);
map.addControl(controlBar);
map.addControl(geolocation);
map.addControl(maptype);
    // 构造官方卫星、路网图层
    var satelliteLayer = new AMap.TileLayer.Satellite();
    var roadNetLayer =  new AMap.TileLayer.RoadNet();  

// 以下是隐藏于显示的js

//卫星窗口，因为是插件，所以与天气的隐藏显示不一样
var weixing1 = true;
function weixing(){
    if(weixing1==true){
        maptype.hide();
        weixing1=false;
    }
    else{
        maptype.show();
        weixing1=true;
    }
}
//天气窗口通过style.display功能实现隐藏与显示
function tianqi(){
    if (tianqichuangkou.style.display === "none") {
        tianqichuangkou.style.display = "block";
    } else {
        tianqichuangkou.style.display = "none";
    }
}
//daohang窗口通过style.display功能实现隐藏与显示
function daohang(){

    // 获取daohangsousuolan和menu元素
    var daohangsousuolan = document.getElementById('daohangsousuolan');
    var menu = document.querySelector('.menu');
    if (daohangsousuolan.style.display === "none") {
        daohangsousuolan.style.display = "block";
        menu.style.transform = 'translateY(68px)';
    } else {
        daohangsousuolan.style.display = "none";
        panel.style.display = "none";
        menu.style.transform = 'translateY(0)';
        if(driving){
            driving.clear();
        }
    }
}
// //导航栏复选框的显示与关闭
// function makeSingleCheckboxGroup() {  
//     // 获取所有的复选框  
//     var checkboxes = document.querySelectorAll('.material-checkbox input[type="checkbox"]');  
  
//     // 为每个复选框添加点击事件监听器  
//     checkboxes.forEach(function(checkbox) {  
//         checkbox.addEventListener('change', function() {  
//             // 如果当前复选框被选中  
//             if (this.checked) {  
//                 // 取消其他所有复选框的选中状态  
//                 checkboxes.forEach(function(otherCheckbox) {  
//                     if (otherCheckbox !== this && otherCheckbox.checked) {  
//                         otherCheckbox.checked = false;  
//                     }  
//                 }, this); // 注意这里的'this'引用的是外部循环的checkbox  
//             }  
//         });  
//     });  
// }  

// // 当文档加载完成后调用函数  
// document.addEventListener('DOMContentLoaded', makeSingleCheckboxGroup); 
// function sousuo(){
//     if (sousuolansousuo.style.display === "none") {
//         sousuolansousuo.style.display = "block";
//     } else {
//         sousuolansousuo.style.display = "none";
//         panel.style.display = "none";
//     }
// }


// 天气
weather = new AMap.Weather();
AMap.plugin('AMap.Weather', function() {
    var weather = new AMap.Weather();
    //未来4天天气预报
    weather.getForecast('徐州市', function(err, data) {
        if (err) {return;}
        var str = [];
        for (var i = 0,dayWeather; i < data.forecasts.length; i++) {
            dayWeather = data.forecasts[i];
            str.push(dayWeather.date+' <span class="weather">'+dayWeather.dayWeather+'</span> '+ dayWeather.nightTemp + '~' + dayWeather.dayTemp + '℃');
        }
        document.getElementById('forecast').innerHTML = str.join('<br>');
    });
});



//以下是导航 关键字
var driving;
function daohanghanshu(){
    if(driving){
        driving.clear();
    }
    //多次查询显示窗口
    panel.style.display = "block";
    //清空原来panel窗口里的内容
    var panelElement = document.getElementById('panel');  
    while (panelElement.firstChild) {  
        panelElement.removeChild(panelElement.firstChild);  
    }
      driving = new AMap.Driving({
      map: map,
      panel: "panel"
    }); 
    getLocationAndProcessPoints();
    var x =daohangqidian.value;
    var y =daohangzhongdian.value;
    // 根据起终点名称规划驾车导航路线
    driving.search([
        {keyword: x,city:'徐州'},
        {keyword: y,city:'徐州'}        
    ],function(status, result) {
        if (status === 'complete') {
            log.success('绘制驾车路线完成')
        } else {
            log.error('获取驾车数据失败：' + result)
        }
    });
    } 
    //导航 关键字

//以下是导航 经纬度
    var driving;
    function jingweidudaohang(data1,data2,data3,data4){
        if(driving){
            driving.clear();
        }
        //多次查询显示窗口
        panel.style.display = "block";
        //清空原来panel窗口里的内容
        var panelElement = document.getElementById('panel');  
        while (panelElement.firstChild) {  
            panelElement.removeChild(panelElement.firstChild);  
        }
        driving = new AMap.Driving({
        map: map,
        panel: "panel"
        }); 
        driving.search(new AMap.LngLat(data1, data2), new AMap.LngLat(data3,data4), function (status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        if (status === 'complete') {
            log.success('绘制驾车路线完成')
        } else {
            log.error('获取驾车数据失败：' + result)
        }
        });} 
        //导航 经纬度



    
    // 以下是模糊查询
        //模糊查询
        var autoOptions = {
          input: "daohangqidian",
      };
          var auto = new AMap.AutoComplete(autoOptions);
          var placeSearch = new AMap.PlaceSearch({
              map: map,
          });  //构造地点查询类
          auto.on("select", select);//注册监听，当选中某条记录时会触发
          function select(e) {
              placeSearch.setCity(e.poi.adcode);
              placeSearch.search(e.poi.name);  //关键字查询查询
          }; 
      var autoOptions = {
          input: "daohangzhongdian",
      };
          var auto = new AMap.AutoComplete(autoOptions);
          var placeSearch = new AMap.PlaceSearch({
              map: map,
          });  //构造地点查询类
          auto.on("select", select);//注册监听，当选中某条记录时会触发
          function select(e) {
              placeSearch.setCity(e.poi.adcode);
              placeSearch.search(e.poi.name);  //关键字查询查询
          }; 



          // 以下是查询
function sousuo() {  
    document.getElementById("myDropdown").classList.toggle("show");  
  }  
    
  // 监听点击事件，确保点击下拉列表外部时隐藏下拉列表  
  window.onclick = function(event) {  
    if (!event.target.matches('.btn-zexiao') &&  
        !event.target.matches('.dropdown-content a')) {  
      var dropdowns = document.getElementsByClassName("dropdown-content");  
      var i;  
      for (i = 0; i < dropdowns.length; i++) {  
        var openDropdown = dropdowns[i];  
        if (openDropdown.classList.contains('show')) {  
          openDropdown.classList.remove('show');  
        }  
      }  
    }  
  }




// 以下是右键导航功能以及右键菜单的设计
  let radius = 5000;
  huadongkuang.style.display = "none";
  let marker_weizhidianbiaoji = []; // 初始化标记数组
  let distances = []; // 初始化距离数组
  let issup = false;
  let userLatitude = null;
  let userLongitude = null;
  var slider = document.getElementById('customRange1');
  var infoWindow = new AMap.InfoWindow({
    offset: new AMap.Pixel(0, -30)
  });
  
  function fujindechongdianzhuang() {
    if (userLatitude === null || userLongitude === null) {
      console.error("用户位置尚未确定");
      return;
    }
  
    const content = `<div class="custom-content-marker">
      <img src="https://a.amap.com/Loca/static/loca-v2/demos/mock_data/charging_pile.png" style="height:75px;width:48px">
    </div>`;
  
    if (issup) {
      // 移除所有标记
      marker_weizhidianbiaoji.forEach(marker => {
        if (marker) {
          map.remove(marker);
          
          if(driving){
            driving.clear();
        }
          huadongkuang.style.display = "none ";
          slider.value = 5000;
          sliderValue.textContent = "5000 米";
          radius = 5000;
        }
      });
      marker_weizhidianbiaoji = []; // 清空标记数组
      distances = []; // 清空距离数组
      issup = !issup;
    } else {
      if(driving){
        driving.clear();
    }
    if (points_marker.length > 0) {
      map.remove(points_marker);
      points_marker = [];
  }
      huadongkuang.style.display = "block";
      getLocationAndProcessPoints();
      for (let i = 0; i < points.length; i++) {
        var distance = AMap.GeometryUtil.distance([userLongitude, userLatitude], [points[i].longitude, points[i].latitude]);
        if (distance < radius) {
          distances.push(distance); // 存储距离
          var marker = new AMap.Marker({
            content: content,
            position: [points[i].longitude, points[i].latitude],
          });
          marker.setExtData({ ...points[i], distance }); // 设置扩展数据
          marker_weizhidianbiaoji.push(marker); // 将标记添加到数组中
  
          // 绑定鼠标移入和移出事件
          marker.on('mouseover', function (e) {
            var extData = e.target.getExtData();
            var infoContent = `<div>
            <h4>${extData.name}</h4>
            <p style="margin: 5px 0;">地址: ${extData.address}</p>
            <p style="margin: 5px 0;">距离: ${extData.distance ? extData.distance.toFixed(2) + ' 米' : '未知'}</p>
            <p style="margin: 5px 0;">经度: ${extData.longitude}</p>
            <p style="margin: 5px 0;">纬度: ${extData.latitude}</p>
            <p style="margin: 5px 0;">评分: ${extData.stars}</p>
            <p style="margin: 5px 0;">价格: ¥${extData.price}/度</p>
            <div id="quanjing"></div>
            <img src="./status3/充电桩.svg" style="height:30px;width:30px">
        </div>`;

            infoWindow.setContent(infoContent);
            infoWindow.open(map, e.target.getPosition());
          });
  
          marker.on('mouseout', function () {
            infoWindow.close();
          });
  
          // 创建右键菜单
          var contextMenu = new AMap.ContextMenu();
  
          // 右键放大
          contextMenu.addItem("放大一级", function () {
            map.zoomIn();
          }, 0);
  
          // 右键缩小
          contextMenu.addItem("缩小一级", function () {
            map.zoomOut();
          }, 1);
  
          // 右键导航
          contextMenu.addItem("获得位置", function () {
            var extData = contextMenu.marker.getExtData();
            jingweidudaohang(userLongitude,userLatitude,extData.longitude,extData.latitude);
            // console.log(`标记点经度: ${extData.longitude}, 标记点纬度: ${extData.latitude}`);
            // console.log(`用户当前位置 - 经度: ${userLongitude}, 纬度: ${userLatitude}`);
            // console.log(`右键点击标记点经度: ${contextMenu.marker.getPosition().lng}, 标记点纬度: ${contextMenu.marker.getPosition().lat}`);
          }, 2);
  
          // 绑定右键点击事件，弹出右键菜单
          marker.on('rightclick', function (e) {
            contextMenu.open(map, e.lnglat);
            contextMenu.marker = e.target; // 将标记对象保存到菜单对象中
          });
  
          // 绑定右键点击事件，打印点击处标记点的经纬度
          // marker.on('rightclick', function (e) {
          //   var extData = e.target.getExtData();
          //   var biaojidianjingweidushuju = e.target;
          //   // console.log(`右键点击标记点经度: ${extData.longitude}, 标记点纬度: ${extData.latitude}`);
          //   // console.log(biaojidianjingweidushuju._position[0]);
          // });
        }
      }
      // 循环结束后添加所有符合条件的标记到地图上
      marker_weizhidianbiaoji.forEach(marker => {
        if (marker) {
          map.add(marker);
        }
      });
      issup = !issup;
    }
  }
  
  function onComplete(data) {
    userLatitude = data.position.lat;
    userLongitude = data.position.lng;
  
    // 设置地图中心为用户位置
    map.setCenter([userLongitude, userLatitude]);
  }
  
  function onError(data) {
    document.getElementById('status').innerHTML = '定位失败';
    document.getElementById('result').innerHTML = '失败原因排查信息:' + data.message + '</br>浏览器返回信息：' + data.originMessage;
  }
  
  function getLocationAndProcessPoints() {
    AMap.plugin('AMap.Geolocation', function() {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000,           // 超过10秒后停止定位，默认：5s
        position: 'RB',           // 定位按钮的停靠位置
        offset: [10, 20]          // 定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
      });
  
      geolocation.getCurrentPosition(function(status, result) {
        if (status === 'complete') {
          onComplete(result);
        } else {
          onError(result);
        }
      });
    });
  }
  
  // 获取用户位置
  getLocationAndProcessPoints();


// 隐藏菜单
menu.style.display = "none";
var menuu = document.querySelector('.menu');
var points_marker = [];

// 行政区划功能
function xingzhengquhua() {
    if (menuu.style.display === "none") {
        // 显示菜单并启用功能
        menuu.style.display = "block";
        if (driving) {
            driving.clear();
        }
        district_points_Search(true);
    } else {
        // 隐藏菜单并禁用功能
        menuu.style.display = "none";
        district_points_Search(false);
        if (driving) {
            driving.clear();
        }
    }
}

// 标记点内容
var markerContent = 
    '<div class="custom-content-marker">' +
    '   <img src="https://a.amap.com/Loca/static/loca-v2/demos/mock_data/charging_pile.png" style="position:relative; height:57px; width:36px;">' +
    '</div>';

// 行政区查询功能
function district_points_Search(enable) {
    if (enable) {
        // 启用点击事件处理程序
        map.on('click', handleMapClick);
    } else {
        // 清除所有标记点
        if (points_marker.length > 0) {
            map.remove(points_marker);
            points_marker = [];
            
        }
        // 移除点击事件处理程序
        map.off('click', handleMapClick);
    }
}

// 处理地图点击事件
var customMarkerContent = 
'<div class="custom-content-marker">' +
'   <img src="https://a.amap.com/Loca/static/loca-v2/demos/mock_data/charging_pile.png" style="position:relative; height:57px; width:36px;">' +
'</div>';

var points_marker = []; // 用于存储当前显示的标记点
var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) }); // 创建一个全局的 InfoWindow 实例

function handleMapClick(e) {
    // 首先，移除上一次点击产生的所有标记点
    if (points_marker.length > 0) {
        map.remove(points_marker);
        points_marker = []; // 重置points_marker数组
    }

    let lnglat = e.lnglat;
    let geocoder = new AMap.Geocoder({
        city: "徐州市", // 城市设为徐州
        radius: 1000 // 范围，默认500米
    });
    geocoder.getAddress(lnglat, function (status, result) {
        if (status === 'complete' && result.regeocode) {
            let district_forsearch = result.regeocode.addressComponent.adcode;
            let matchedPoints = [];
            for (let i = 0; i < points.length; i++) {
                if (points[i].adcode === district_forsearch) {
                    matchedPoints.push(points[i]);
                }
            }
            // 只有在找到匹配的点时才创建新的标记点
            if (matchedPoints.length > 0) {
                matchedPoints.forEach(point => {
                    var distance = AMap.GeometryUtil.distance([userLongitude, userLatitude], [point.longitude, point.latitude]);
                    let marker = new AMap.Marker({
                        position: [point.longitude, point.latitude],
                        content: customMarkerContent,
                        extData: { ...point, distance } // 将点的信息和距离一起存储到extData中
                    });

                    // 创建右键菜单并关联到marker
                    let contextMenu = new AMap.ContextMenu();

                    // 放大一级
                    contextMenu.addItem("放大一级", function () {
                        map.zoomIn();
                    }, 0);

                    // 缩小一级
                    contextMenu.addItem("缩小一级", function () {
                        map.zoomOut();
                    }, 1);

                    // 导航至此
                    contextMenu.addItem("导航至此", function () {
                        var extData = marker.getExtData();
                        jingweidudaohang(userLongitude, userLatitude, extData.longitude, extData.latitude);
                    }, 2);

                    marker.on('rightclick', function (e) {
                        contextMenu.open(map, e.lnglat);
                    });

                    // 添加鼠标移入事件，显示信息窗
                    marker.on('mouseover', function (e) {
                        let extData = marker.getExtData();
                        let infoContent = `<div>
                            <h4>${extData.name}</h4>
                            <p style="margin: 5px 0;">地址: ${extData.address}</p>
                            <p style="margin: 5px 0;">距离: ${extData.distance ? extData.distance.toFixed(2) + ' 米' : '未知'}</p>
                            <p style="margin: 5px 0;">经度: ${extData.longitude}</p>
                            <p style="margin: 5px 0;">纬度: ${extData.latitude}</p>
                            <p style="margin: 5px 0;">评分: ${extData.stars}</p>
                            <p style="margin: 5px 0;">价格: ¥${extData.price}/度</p>
                            <div id="quanjing"></div>
                            <img src="./status3/充电桩.svg" style="height:30px;width:30px">
                        </div>`;

                        infoWindow.setContent(infoContent);
                        infoWindow.open(map, marker.getPosition());
                    });

                    // 添加鼠标移出事件，关闭信息窗
                    marker.on('mouseout', function (e) {
                        infoWindow.close();
                    });

                    points_marker.push(marker);
                    map.add(marker);
                });
            }
        } else {
            console.error('查询行政区失败');
        }
    });
}




//根据左侧点击来触发不同的函数展示不同的地区
var customMarkerContent = 
'<div class="custom-content-marker">' +
'   <img src="https://a.amap.com/Loca/static/loca-v2/demos/mock_data/charging_pile.png" style="position:relative; height:57px; width:36px;">' +
'</div>';

var points_marker = []; // 用于存储当前显示的标记点
var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) }); // 创建一个全局的 InfoWindow 实例

// 新增函数 displayMarkersByAdcode，根据传入的地理编码进行匹配并在地图上标记
function displayMarkersByAdcode(adcode) {
    if (points_marker.length > 0) {
        map.remove(points_marker);
        points_marker = [];
    }
    // 清除上一次的标记点

    // 匹配地理编码
    let matchedPoints = points.filter(point => point.adcode === adcode);

    // 只有在找到匹配的点时才创建新的标记点
    if (matchedPoints.length > 0) {
        matchedPoints.forEach(point => {
            var distance = AMap.GeometryUtil.distance([userLongitude, userLatitude], [point.longitude, point.latitude]);
            let marker = new AMap.Marker({
                position: [point.longitude, point.latitude],
                content: customMarkerContent,
                extData: { ...point, distance } // 将点的信息和距离一起存储到extData中
            });

            // 创建右键菜单并关联到marker
            let contextMenu = new AMap.ContextMenu();

            // 放大一级
            contextMenu.addItem("放大一级", function () {
                map.zoomIn();
            }, 0);

            // 缩小一级
            contextMenu.addItem("缩小一级", function () {
                map.zoomOut();
            }, 1);

            // 导航至此
            contextMenu.addItem("导航至此", function () {
                var extData = marker.getExtData();
                jingweidudaohang(userLongitude, userLatitude, extData.longitude, extData.latitude);
            }, 2);

            marker.on('rightclick', function (e) {
                contextMenu.open(map, e.lnglat);
            });

            // 添加鼠标移入事件，显示信息窗
            marker.on('mouseover', function (e) {
                let extData = marker.getExtData();
                let infoContent = `<div>
                    <h4>${extData.name}</h4>
                    <p style="margin: 5px 0;">地址: ${extData.address}</p>
                    <p style="margin: 5px 0;">距离: ${extData.distance ? extData.distance.toFixed(2) + ' 米' : '未知'}</p>
                    <p style="margin: 5px 0;">经度: ${extData.longitude}</p>
                    <p style="margin: 5px 0;">纬度: ${extData.latitude}</p>
                    <p style="margin: 5px 0;">评分: ${extData.stars}</p>
                    <p style="margin: 5px 0;">价格: ¥${extData.price}/度</p>
                    <div id="quanjing"></div>
                    <img src="./status3/充电桩.svg" style="height:30px;width:30px">
                </div>`;

                infoWindow.setContent(infoContent);
                infoWindow.open(map, marker.getPosition());
            });

            // 添加鼠标移出事件，关闭信息窗
            marker.on('mouseout', function (e) {
                infoWindow.close();
            });

            points_marker.push(marker);
            map.add(marker);
        });
    } else {
        console.log('未找到匹配的点');
    }
}