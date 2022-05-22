d3.csv('renewable-percentage.csv').then(function(loadedData) {

  let renewables = [];
  let labels = [];

  for (let i=0; i<loadedData.length; i++) {
    renewables.push(loadedData[i].Renewables);
    labels.push(loadedData[i].Year);
  }

  const totalDuration = 5000;
  const delayBetweenPoints = totalDuration / labels.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

  var ctx = document.getElementById('chart7').getContext('2d');

  var chart7 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Renewables',
        borderColor: 'rgba(39, 169, 39, 1)',
        backgroundColor: 'rgba(39, 169, 39, 1)',
        borderWidth: 2.5,
        radius: 0,
        data: renewables,
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
          text: "Percentage of global electricity produced",
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
              return value + '%';
            }
          },
          title: {
            display: true,
            align: 'center',
            text: 'Percentage of global electricity production',
            font: 'OpenSans-SemiBold'
          }
        }
      }
    }
  });
});
