/*

echarts 图形绘制图表绘制


*/
    const Echart = new Function();

    Echart.Docment = $(document);

    Echart.Map = function (Element) {
        return echarts.init(Element);
    }

    Echart.WidthResize = function (arry) {
        var le = arry.length;
        if (le == 0 || le == undefined) {
            arry.style.width = ((window.innerWidth) - 20) + "px";
        }
        else {
            for (let i = 0; i < arry.length; i++) {
                arry[i].style.width = ((window.innerWidth) - 20) + "px";
            }
        }
    }

    Echart.setOption = function (Map, obj) {
        Map.setOption(obj);
    }

    Echart.resize = function (element) {
        Echart.Docment.resize(function () {
            element.resize();
        });
    }

    Echart.returns = function () {

    }
    //Echart.Map元素转换Echart对象
    //Echart.WidthResize自适应宽高
    //Echart.resize根据屏幕改变大小响应

    //UT Performance 1
    Echart.WidthResize(Performance_chart);
    Performance_chart = Echart.Map(Performance_chart);

    let Performance_charts = {
        title: {
            text:""
        },
        tooltip: {},
        legend: {
            data: ['', '']
        },
        xAxis: {
            data: ["YTD", "1D", "1W", "1M", "3M", "6M","1Y", "2Y", "3Y", "5Y", "10Y"],
            axisLabel: {
                interval: 0,//横轴信息全部显示  
            },
            //列斜着显示
            type : 'category',
            axisLabel:{
                interval:0,
                rotate:45,
                margin:2,
                textStyle:{
                color:"#333"
                }
            },
        },
        yAxis: {
        },
        legendHoverLink:true,
        color: [
            '#164589',"#F88D19"
        ],
        grid: {
            x: 44,
            y: 10,
            x2: 0,
            y2: 20,
            borderWidth: 1
        },
        series: [
                {
                    name: '',
                    type: 'bar',
                    data: [0, 0, 0, 0, 0, 0]
                },
                {
                    name: '',
                    type: 'bar',
                    data: [0, 0, 0, 0, 0, 0]
                }
        ]
    };

    Echart.setOption(Performance_chart,Performance_charts);

    Echart.resize($(document), Performance_chart);

    //UT Performance 2
    Echart.WidthResize(Performance_chart1);
    Performance_chart1 = Echart.Map(Performance_chart1);

    let Performance_chart1s = {
        title: {
            text: ''
        },
        tooltip: {},
        legend: {
            data: ['', '']
        },
        xAxis: {
            data: ["1Y", "2Y", "3Y", "5Y", "10Y"],
            axisLabel: {
                interval: 0,//横轴信息全部显示  
            },
            //列斜着显示
            //type: 'category',
            //axisLabel: {
            //    interval: 0,
            //    rotate: 45,
            //    margin: 2,
            //    textStyle: {
            //        color: "#333"
            //    }
            //},
        },
        yAxis: {
        },
        legendHoverLink: true,
        color: [
            '#164589', "#F88D19"
        ],
        grid: {
            x: 44,
            y: 10,
            x2: 0,
            y2: 20,
            borderWidth: 1
        },
        series: [
            {
                name: '',
                type: 'bar',
                data: [0, 0, 0, 0, 0]
            },
            {
                name: '',
                type: 'bar',
                data: [0, 0, 0, 0, 0]
            }
        ]
    }

    Echart.setOption(Performance_chart1, Performance_chart1s);

    Echart.resize($(document), Performance_chart1);

