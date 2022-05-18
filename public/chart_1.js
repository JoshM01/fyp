d3.csv('data.csv').then(function(loadedData) {

  let co2 = [];
  let temp = [];
  let labels = [];

  for (let i=0; i<loadedData.length; i++) {
    if(loadedData[i].CO2_concentration!=''){
      let concentration = loadedData[i].CO2_concentration;
      co2.push(loadedData[i].CO2_concentration)
    }else{
      co2.push(NaN)
    }

    temp.push(loadedData[i].Temperature_deviation);
    labels.push(loadedData[i].Year);
  }

  const totalDuration = 10000;
  const delayBetweenPoints = totalDuration / labels.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

  var ctx = document.getElementById('chart1').getContext('2d');

  var chart1 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Deviation from mean temperature* (°C)',
        borderColor: 'rgba(255, 39, 39, 1)',
        backgroundColor: 'rgba(255, 39, 39, 0.5)',
        borderWidth: 2.5,
        radius: 0,
        data: temp,
        yAxisID: 'y',
      },
      {
        label: 'Concentration of CO₂ in the atmosphere (ppm)',
        borderColor: 'rgba(39, 124, 255, 1)',
        backgroundColor: 'rgba(39, 124, 255, 0.5)',
        borderWidth: 2.5,
        radius: 0,
        data: co2,
        yAxisID: 'y1',
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
      stacked: false,
      plugins: {
        legend: true,
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'year',
            tooltipFormat: 'yyyy',
          },
          displayFormats: {
            year: 'yyyy',
          },
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
            text: 'Deviation from mean temperature* (°C)',
            font: 'OpenSans-SemiBold'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
          },
          title: {
            display: true,
            align: 'center',
            text: 'Concentration of CO₂ in the atmosphere (ppm)',
            font: 'OpenSans-SemiBold'
          }
        }
      }
    }
  });
});
