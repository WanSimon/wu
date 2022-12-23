import React, { useEffect } from "react";
import styled from "styled-components";
import * as echarts from "echarts";
import { Radio } from "antd";
import { chinaGeoCoordMap, chinaDatas } from "./data";

const Homewrap = styled.div`
  display: flex;
  flex-direction: column;

  /* width: 100%; */
  height: 450/16rem;

  .echart-box {
    width: 100%;
    height: 18.75rem;
  }
  .blockContent {
    display: flex;
  }
  .block {
    background-color: #054a9d;
    width: 158px;
    height: 68px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    .num {
      color: #fff;
      font-size: 24px;
      padding-top: 5px;
    }
    .text {
      color: #287bdb;
      font-size: 14px;
      padding-top: 8px;
      padding-bottom: 5px;
    }
  }
`;

const Map = () => {
  const echartF = () => {
    // 初始化echarts
    const myChart = echarts.init(
      document.getElementById("Map") as any,
      "dark",
      {
        renderer: "svg",
      }
    );
    var convertData = function (data: any) {
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

    var series: any = [];
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
              formatter: function (params: any) {
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
          symbolSize: function (val: any) {
            return 5 + val[2] * 5; //圆环大小
          },
          itemStyle: {
            normal: {
              show: true,
              color: "#f00",
            },
          },
          data: item[1].map(function (dataItem: any) {
            return {
              name: dataItem[0].name,
              value: chinaGeoCoordMap[dataItem[0].name].concat([
                dataItem[0].value,
              ]),
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
    const option = {
      tooltip: {
        trigger: "item",
        backgroundColor: "#04284e",
        borderColor: "#FFFFCC",
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: "z-index:100",
        formatter: function (params: any, ticket: any, callback: any) {
          //根据业务自己拓展要显示的内容
          var res = "";
          var name = params.name;
          var value = params.value[params.seriesIndex + 1];
          res =
            "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
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
              //       color: "#161C3F",
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
    // 绘制图表
    myChart.setOption(option);
  };

  useEffect(() => {
    echartF();
  }, []);

  return (
    <Homewrap style={{}}>
      <div className="blockContent">
        <div className="block">
          <div className="num">371,570</div>
          <div className="text">联盟数</div>
        </div>
        <div className="block">
          <div className="num">371,570</div>
          <div className="text">出块间隔(秒)</div>
        </div>
        <div className="block">
          <div className="num">371,570</div>
          <div className="text">运行节点数</div>
        </div>
        <div className="block">
          <div className="num">371,570</div>
          <div className="text">链上交易总数</div>
        </div>
      </div>
      <div className="echart-box" id="Map"></div>
    </Homewrap>
  );
};

export default Map;
