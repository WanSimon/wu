var chinaGeoCoordMap = {
  黑龙江: [127.9688, 45.368],
  内蒙古: [110.3467, 41.4899],
  吉林: [125.8154, 44.2584],
  北京市: [116.4551, 40.2539],
  辽宁: [123.1238, 42.1216],
  河北: [114.4995, 38.1006],
  天津: [117.4219, 39.4189],
  山西: [112.3352, 37.9413],
  陕西: [109.1162, 34.2004],
  甘肃: [103.5901, 36.3043],
  宁夏: [106.3586, 38.1775],
  青海: [101.4038, 36.8207],
  新疆: [87.9236, 43.5883],
  西藏: [91.11, 29.97],
  四川: [103.9526, 30.7617],
  重庆: [108.384366, 30.439702],
  山东: [117.1582, 36.8701],
  河南: [113.4668, 34.6234],
  江苏: [118.8062, 31.9208],
  安徽: [117.29, 32.0581],
  湖北: [114.3896, 30.6628],
  浙江: [119.5313, 29.8773],
  福建: [119.4543, 25.9222],
  江西: [116.0046, 28.6633],
  湖南: [113.0823, 28.2568],
  贵州: [106.6992, 26.7682],
  云南: [102.9199, 25.4663],
  广东: [113.12244, 23.009505],
  广西: [108.479, 23.1152],
  海南: [110.3893, 19.8516],
  上海: [121.4648, 31.2891],
};
var chinaDatas = [
  [
    {
      name: "北京市",
      value: 0,
    },
    {
      name: "黑龙江",
      value: 0,
    },
    { name: "上海市" },
  ],
  [
    {
      name: "内蒙古",
      value: 0,
    },
  ],
  [
    {
      name: "吉林",
      value: 0,
    },
  ],
  [
    {
      name: "辽宁",
      value: 0,
    },
  ],
  [
    {
      name: "河北",
      value: 0,
    },
  ],
  [
    {
      name: "天津",
      value: 0,
    },
  ],
  [
    {
      name: "山西",
      value: 0,
    },
  ],
  [
    {
      name: "陕西",
      value: 0,
    },
  ],
  [
    {
      name: "甘肃",
      value: 0,
    },
  ],
  [
    {
      name: "宁夏",
      value: 0,
    },
  ],
  [
    {
      name: "青海",
      value: 0,
    },
  ],
  [
    {
      name: "四川",
      value: 0,
    },
  ],
  [
    {
      name: "重庆",
      value: 0,
    },
  ],
  [
    {
      name: "山东",
      value: 0,
    },
  ],
  [
    {
      name: "河南",
      value: 0,
    },
  ],
  [
    {
      name: "江苏",
      value: 0,
    },
  ],
  [
    {
      name: "安徽",
      value: 0,
    },
  ],
  [
    {
      name: "湖北",
      value: 0,
    },
  ],
  [
    {
      name: "浙江",
      value: 0,
    },
  ],
  [
    {
      name: "福建",
      value: 0,
    },
  ],
  [
    {
      name: "江西",
      value: 0,
    },
  ],
  [
    {
      name: "湖南",
      value: 0,
    },
  ],
  [
    {
      name: "贵州",
      value: 0,
    },
  ],
  [
    {
      name: "广西",
      value: 0,
    },
  ],
  [
    {
      name: "海南",
      value: 0,
    },
  ],
  [
    {
      name: "上海",
      value: 0,
    },
  ],
];

var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    var fromCoord = chinaGeoCoordMap[dataItem[0].name];
    var toCoord = [
      [121.4648, 31.2891],
      [110.3467, 41.4899],
      [110.3467, 41.4899],
      [110.3467, 41.4899],
      [110.3467, 41.4899],
      [110.3467, 41.4899],
      [110.3467, 41.4899],
      [110.3467, 41.4899],
    ]; //被攻击点
    if (fromCoord && toCoord[i]) {
      res.push([
        {
          coord: toCoord[i],
        },
        {
          coord: fromCoord,
          value: dataItem[0].value,
          // visualMap: false
        },
      ]);
    }
  }
  return res;
};

var series = [];
[["上海", chinaDatas]].forEach(function (item, i) {
  console.log(item);
  series.push(
    {
      type: "lines",
      zlevel: 2,

      effect: {
        show: false,
        period: 3, //箭头指向速度，值越小速度越快
        trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: "dashed", //箭头图标
        symbolSize: 5, //图标大小
      },
      lineStyle: {
        normal: {
          color: "#C8CC7D",
          width: 1, //尾迹线条宽度
          opacity: 0.7, //尾迹线条透明度
          curveness: 0.3, //尾迹线条曲直度
        },
      },
      label: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: "#529186",
          },
        },
        // 文字hover颜色
        emphasis: {
          show: true, //是否在高亮状态下显示标签。
          textStyle: {
            color: "#000",
          }, //高亮状态下的标签文本样式。
        },
      },
      data: convertData(item[1]),
    },

    {
      type: "effectScatter",
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        //涟漪特效
        period: 4, //动画时间，值越小速度越快
        brushType: "stroke", //波纹绘制方式 stroke, fill
        scale: 4, //波纹圆环最大限制，值越大波纹越大
      },
      label: {
        normal: {
          show: true, //圆环文字
          color: "#519287",
          position: "right", //显示位置
          offset: [5, 0], //偏移设置
          formatter: function (params) {
            //圆环显示文字
            return params.data.name;
          },
          fontSize: 13,
        },
        emphasis: {
          show: false,
        },
      },
      symbol: "circle",
      symbolSize: function (val) {
        return 5 + val[2] * 5; //圆环大小
      },
      itemStyle: {
        normal: {
          show: true,
          color: "#f00",
        },
      },
      data: item[1].map(function (dataItem) {
        return {
          name: dataItem[0].name,
          value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
          // visualMap: false
        };
      }),
    },
    //被攻击点
    {
      type: "scatter",
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        period: 4,
        brushType: "stroke",
        scale: 4,
      },
      label: {
        normal: {
          show: false, //定位点名字
          position: "right",
          // offset:[5, 0],
          color: "#0f0",
          formatter: "{b}",
          textStyle: {
            color: "#0f0",
          },
        },
        emphasis: {
          // show: false,   //定位标记
          color: "#f60",
        },
      },
      symbol: "pin", //定位图标样式
      symbolSize: 50,
      data: [
        {
          name: item[0],
          value: chinaGeoCoordMap[item[0]].concat([10]),
        },
      ],
    }
  );
});

option = {
  tooltip: {
    trigger: "item",
    backgroundColor: "#04284e",
    borderColor: "#FFFFCC",
    showDelay: 0,
    hideDelay: 0,
    enterable: true,
    transitionDuration: 0,
    extraCssText: "z-index:100",
    formatter: function (params, ticket, callback) {
      //根据业务自己拓展要显示的内容
      var res = "";
      var name = params.name;
      var value = params.value[params.seriesIndex + 1];
      res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
      return res;
    },
  },
  backgroundColor: "#0C0926",
  visualMap: {
    //图例值控制
    min: 0,
    max: 1,
    calculable: true,
    show: false,
    color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#C8CC7D"],
    textStyle: {
      color: "#fff",
    },
  },
  geo: [
    {
      map: "china",
      show: true,
      label: {
        emphasis: {
          show: false,
        },
      },
      roam: true, //是否允许缩放
      layoutCenter: ["49%", "50%"], //地图位置
      layoutSize: "120%",
      itemStyle: {
        normal: {
          show: "true",
          color: "#04284e", //地图背景色
          borderColor: "#25508A", //省市边界线
          color: "#161C3F",
          opacity: 0.8,
        },
        emphasis: {
          show: "true",
          color: "rgba(37, 43, 61, .5)", //悬浮背景
        },
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            // 隐藏地图
            normal: {
              opacity: 1, // 为 0 时不绘制该图形
            },
          },
          label: {
            show: true, // 显示文字
            color: "#519287",
          },
        },
      ],
    },
  ],
  series: series,
};
