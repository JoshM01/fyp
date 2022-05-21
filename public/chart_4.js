d3.csv('sector.csv').then(function(loadedData) {

  let eu_per_capita = [];
  let eu_overall = [];
  let world_per_capita = [];
  let world_overall = [];
  let labels = [];

  for (let i=0; i<loadedData.length; i++){
    labels.push(loadedData[i].Sector);
    eu_per_capita.push(loadedData[i].EU_per_capita);
    eu_overall.push(loadedData[i].EU_overall);
    world_per_capita.push(loadedData[i].World_per_capita);
    world_overall.push(loadedData[i].World_overall);
  }

  let colors = ["#ffb4ff","#ff2727","#ff7c27","#ffd027","#baf000","#27a927","#230081","#277cff","#3dffff","#935293"];

  const ctx = document.getElementById('chart4').getContext('2d');

  const chart4 = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: colors,
          data: world_overall,
          borderWidth: 2
        },
        {
          backgroundColor: colors,
          data: eu_overall,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        deferred: {
          yOffset: '50%',
          delay: 250
        },
        legend: {
          position: 'top',
        },
        subtitle: {
          display: true,
          align: 'center',
          text: 'Inside ring = European Union, Outside ring = World',
          padding: 5,
          font: {
            family: 'OpenSans-Medium',
            size: 12
          }
        },
        title: {
          display: true,
          align: 'center',
          text: 'CO₂ emissions by sector (2018, tonnes)',
          font: {
            family: 'OpenSans-SemiBold',
            size: 18
          }
        }
      }
    }
  });
});
