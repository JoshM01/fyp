d3.csv('renewables.csv').then(function(loadedData) {

  let wind_cost = [];
  let solar_cost = [];
  let labels = [];

  for (let i=0; i<loadedData.length; i++) {
    solar_cost.push(loadedData[i].Solar_module_cost);
    wind_cost.push(loadedData[i].Onshore_wind_cost);
    labels.push(loadedData[i].Year);
  }

  const totalDuration = 5000;
  const delayBetweenPoints = totalDuration / labels.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

  var ctx = document.getElementById('chart5').getContext('2d');

  var chart5 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Onshore wind cost per kilowatt-hour',
        borderColor: 'rgba(238, 238, 238, 1)',
        backgroundColor: 'rgba(255, 238, 238, 1)',
        borderWidth: 2.5,
        radius: 0,
        data: wind_cost,
        yAxisID: 'y',
      },
      {
        label: 'Global average price of solar photovoltaic (PV) modules',
        borderColor: 'rgba(39, 124, 255, 1)',
        backgroundColor: 'rgba(39, 124, 255, 1)',
        borderWidth: 2.5,
        radius: 0,
        data: solar_cost,
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
      maintainAspectRatio: false,
      stacked: false,
      plugins: {
        legend: true,
        title: {
          display: true,
          text: "Cost of producing renewable energy (USD, $)",
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
          ticks: {
            callback: function(value, index, ticks) {
              return '$' + value;
            }
          },
          title: {
            display: true,
            align: 'center',
            text: 'Onshore wind cost per kilowatt-hour',
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
          ticks: {
            callback: function(value, index, ticks) {
              return '$' + value;
            }
          },
          title: {
            display: true,
            align: 'center',
            text: 'Global average price of solar PV modules',
            font: 'OpenSans-SemiBold'
          }
        }
      }
    }
  });
});
