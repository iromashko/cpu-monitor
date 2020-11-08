google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawBasic);

let socket = io();

let chartLoaded = false;
let histogram = [];

socket.on('cpu histogram', function (cpuHistogram) {
  histogram = cpuHistogram;

  if (chartLoaded) {
    drawBasic();
  }
});

function drawBasic() {
  let data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'CPU');

  data.addRows(histogram);

  let options = {
    hAxis: {
      title: 'Seconds',
    },
    vAxis: {
      title: 'CPU Load',
      viewWindow: {
        min: 0,
        max: 100,
      },
    },
  };

  let chart = new google.visualization.LineChart(
    document.getElementById('chart_div')
  );
  chart.draw(data, options);

  chartLoaded = true;
}
