export const LINE_OPTION_CONFIG = {
  legend: {
    left: 0,
    orient: 'horizontal',
    data: []
  },
  grid: {
    width: 'auto',
    height: 'auto',
    left: '10%',
    right: '5%'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [],
  tooltip: {
    trigger: 'axis'
  }
}
export const LINE_MEDIA_CONFIG = [{
    query: {
      maxWidth: 768,
      minWidth: 400
    },
    option: {
      legend: {
        orient: 'horizontal',
        
      },
      grid: {
        left: "5%",
        top: "10%",
        containLabel: true
      }
    }
  },
  {
    query: {
      maxWidth: 400
    },
    option: {
      legend: {
        orient: 'vertical',
        //padding:10
        left: '20%'
      },
      grid: {
        top: '30%',
        left: 'center',
        containLabel: true,
        width:'90%'
      }
    }
  }
]
