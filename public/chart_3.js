d3.csv('heathrow.csv').then(function(loadedData) {

    let tmax_jul = [];
    let tmin_jul = [];
    let labels = [];

    for (let i=0; i<loadedData.length; i++) {
      if(loadedData[i].mm == "7"){
        tmax_jul.push(loadedData[i].tmax);
      }
      if(loadedData[i].mm == "7"){
        tmin_jul.push(loadedData[i].tmin);
      }
      if(i % 12 == 0){
        labels.push(loadedData[i].yyyy);
      }
    }

    const totalDuration = 10000;
    const delayBetweenPoints = totalDuration / labels.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

    var ctx = document.getElementById('chart3');

    var chart3 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average daily maximum temperature in July',
          borderColor: 'rgba(255, 124, 39, 0.5)',
          backgroundColor: 'rgba(255, 124, 39, 0.5)',
          borderWidth: 2.5,
          radius: 0,
          data: tmax_jul,
          trendlineLinear: {
        		style: "rgba(255, 124, 39, 1)",
        		lineStyle: "dotted",
        		width: 5,
          }
        },
        {
          label: 'Average daily minimum temperature in July',
          borderColor: 'rgba(255, 208, 39, 0.5)',
          backgroundColor: 'rgba(255, 208, 39, 0.5)',
          borderWidth: 2.5,
          radius: 0,
          data: tmin_jul,
          trendlineLinear: {
        		style: "rgba(255, 208, 39, 1)",
        		lineStyle: "dotted",
        		width: 5,
          }
        }]
      },
      options: {
        animation: {
          x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN,
            delay(ctx) {
              if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
              }
              ctx.xStarted = true;
              return ctx.index * delayBetweenPoints;
            }
          },
          y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
              if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
              }
              ctx.yStarted = true;
              return ctx.index * delayBetweenPoints;
            }
          }
        },
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false
        },
        maintainAspectRatio: false,
        stacked: false,
        plugins: {
          legend: true,
          title: {
            display: true,
            text: "Average temperatures in July at Heathrow, UK",
            font: {
              size: 18
            },
            padding: {
              top: 20,
              bottom: 10
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            title: {
              display: true,
              align: 'center',
              text: 'Year',
              font: 'OpenSans-SemiBold'
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              display: false,
            },
            title: {
              display: true,
              align: 'center',
              text: 'Average monthly temperature (°C)',
              font: 'OpenSans-SemiBold'
            }
          }
        }
      }
    });
  });
