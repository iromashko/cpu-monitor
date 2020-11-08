const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const os = require('os-utils');

app.use(express.static('html'));

let cpuHistogram = [];
let histogramLength = 61;
let interval = 100;

http.listen(process.env.PORT || 3000, () => {
  for (let i = 0; i < histogramLength; i++) {
    cpuHistogram[i] = [i, 0];
  }

  setInterval(function () {
    os.cpuUsage(function (value) {
      updateCpuHistogram(Math.round(value * 100));
      io.emit('cpu histogram', cpuHistogram);
    });
  }, interval);
});

function updateCpuHistogram(cpuLoad) {
  if (cpuHistogram.length >= histogramLength) {
    cpuHistogram.shift();
  }

  cpuHistogram.push([0, cpuLoad]);
  for (let i = 0; i < histogramLength; i++) {
    cpuHistogram[i][0] = i;
  }
}
