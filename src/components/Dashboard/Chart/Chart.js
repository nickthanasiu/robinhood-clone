/*eslint-disable*/
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import './style.scss';

const chartData = {
  labels: ["2017-07-19", "2017-07-20", "2017-07-21", "2017-07-24", "2017-07-25", "2017-07-26", "2017-07-27"],
  datasets: [{
    label: 'My First dataset',
    fill: false,
    lineTension: 0.1,
    borderColor: '#30cd9a',
    borderWidth: 2,
    pointRadius: 0,
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const chartOptions = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false,
    }],
    yAxes: [{
      display: false,
      gridLines: {
        display: false,
      }
    }],
  },
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSeries: 'Past Week',
    };
  }

  render() {
    return (
      <div className="chart">
        <div className="chart-wrapper">
          <Line height={75} data={chartData} options={chartOptions} />
        </div>
      </div>
    );
  }
}

export default Chart;
