// making drop-down list  redirect to the page that is select
function topics(src) {
  window.location = src;
}
//Search

//////////////////////////////////////////////////////////
/* Marco- pages */
var timeFormat = "1";

function newDate(years) {
  return moment().add(years, "y").toDate();
}

function newDateString(years) {
  return moment().add(years, "y").format(timeFormat);
}

var color = Chart.helpers.color;
var config = {
  type: "line",
  data: {
    labels: [
      // Date Objects
      newDate(1),
      newDate(2),
      newDate(3),
      newDate(4),
      newDate(5),
      newDate(6),
      newDate(7),
      newDate(8),
    ],
    datasets: [
      {
        label: "Business Cycle",
        backgroundColor: color(window.chartColors.yellow)
          .alpha(0.5)
          .rgbString(),
        borderColor: window.chartColors.yellow,
        fill: false,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
      },
      {
        label: "Unemployment-Rate",
        backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
        borderColor: window.chartColors.red,
        fill: false,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
      },
      {
        label: "Economics Cycle",
        backgroundColor: color(window.chartColors.black).alpha(0.5).rgbString(),
        borderColor: window.chartColors.black,
        fill: false,
        data: [
          {
            x: newDateString(0),
            y: randomScalingFactor(),
          },
          {
            x: newDateString(5),
            y: randomScalingFactor(),
          },
          {
            x: newDateString(7),
            y: randomScalingFactor(),
          },
          {
            x: newDateString(15),
            y: randomScalingFactor(),
          },
        ],
      },
    ],
  },
  options: {
    title: {
      text: "Chart.js Time Scale",
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: timeFormat,
            // round: 'day'
            tooltipFormat: "ll HH:mm",
          },
          scaleLabel: {
            display: true,
            labelString: "Year",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Price",
          },
        },
      ],
    },
  },
};

window.onload = function () {
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myLine = new Chart(ctx, config);

  document
    .getElementById("randomizeData")
    .addEventListener("click", function () {
      config.data.datasets.forEach(function (dataset) {
        dataset.data.forEach(function (dataObj, j) {
          if (typeof dataObj === "object") {
            dataObj.y = randomScalingFactor();
          } else {
            dataset.data[j] = randomScalingFactor();
          }
        });
      });

      window.myLine.update();
    });

  var colorNames = Object.keys(window.chartColors);
  document.getElementById("addDataset").addEventListener("click", function () {
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
    var newColor = window.chartColors[colorName];
    var newDataset = {
      label: "Dataset" + config.data.datasets.length,
      borderColor: newColor,
      backgroundColor: color(newColor).alpha(0.5).rgbString(),
      data: [],
    };

    for (var i = 0; i < config.data.labels.length; i++) {
      newDataset.data.push(randomScalingFactor());
    }

    config.data.datasets.push(newDataset);
    window.myLine.update();
  });

  document.getElementById("addData").addEventListener("click", function () {
    if (config.data.datasets.length > 0) {
      config.data.labels.push(newDate(config.data.labels.length));

      for (var i = 0; i < config.data.datasets.length; i++) {
        if (typeof config.data.datasets[i].data[0] === "object") {
          config.data.datasets[i].data.push({
            x: newDate(config.data.datasets[i].data.length),
            y: randomScalingFactor(),
          });
        } else {
          config.data.datasets[i].data.push(randomScalingFactor());
        }
      }

      window.myLine.update();
    }
  });

  document
    .getElementById("removeDataset")
    .addEventListener("click", function () {
      config.data.datasets.splice(0, 1); // remove dataset
      window.myLine.update();
    });

  document.getElementById("removeData").addEventListener("click", function () {
    config.data.labels.splice(-1, 1); // remove the label first

    config.data.datasets.forEach(function (dataset) {
      dataset.data.pop();
    });

    window.myLine.update();
  });
};
