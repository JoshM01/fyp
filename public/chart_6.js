d3.csv('renewable-consumption.csv').then(function(loadedData) {

  let wind = [];
  let solar = [];
  let hydro = [];
  let other = [];
  let labels = [];

  for (let i=0; i<loadedData.length; i++) {
    wind.push(loadedData[i].Wind);
    solar.push(loadedData[i].Solar);
    hydro.push(loadedData[i].Hydro);
    other.push(loadedData[i].Other);
    labels.push(loadedData[i].Year);
  }

  const totalDuration = 5000;
  const delayBetweenPoints = totalDuration / labels.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

  var ctx = document.getElementById('chart6').getContext('2d');

  var chart6 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Wind',
        borderColor: 'rgba(238, 238, 238, 1)',
        backgroundColor: 'rgba(238, 238, 238, 1)',
        borderWidth: 2.5,
        radius: 0,
        data: wind,
      },
      {
        label: 'Solar',
        borderColor: 'rgba(255, 208, 39, 1)',
        backgroundColor: 'rgba(255, 208, 39, 1)',
        borderWidth: 2.5,
        radius: 0,
        data: solar,
      },
      {
        label: 'Hydro',
        borderColor: 'rgba(39, 124, 255, 1)',
        backgroundColor: 'rgba(39, 124, 255, 1)',
        borderWidth: 2.5,
        radius: 0,
        data: hydro,
      },
      {
        label: 'Other',
        borderColor: 'rgba(255, 39, 39, 1)',
        backgroundColor: 'rgba(255, 39, 39, 1)',
        borderWidth: 2.5,
        radius: 0,
        data: other
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
        title: {
          display: true,
          text: "Global renewable energy production (terrawhat-hours)",
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
            text: 'Electricity produced (TWh)',
            font: 'OpenSans-SemiBold'
          }
        }
      }
    }
  });
});
