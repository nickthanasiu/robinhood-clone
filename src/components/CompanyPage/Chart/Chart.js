/*eslint-disable*/
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import './style.scss';

const intradayPricePoints = [
  "10.0000", "9.9400", "9.9160", "9.9400", "9.9550", "9.9950", "9.9449", "9.9400", "9.9850", "9.9800", "9.9700", "10.0350", "10.0310", "10.0450", "10.0200", "9.9900", "10.0350", "10.0000", "10.0150", "10.0150", "10.0151", "9.9950", "9.9850", "9.9875", "9.9850", "10.0050", "9.9990", "9.9857", "9.9950", "9.9650", "9.9700", "9.9500", "9.9700", "9.9650", "9.9800", "9.9650", "9.9850", "9.9750", "9.9900", "9.9900", "10.0001", "9.9850", "10.0101", "10.0200", "10.0400", "9.9959", "10.0050", "10.0048", "10.0342", "10.0100", "10.0000", "10.0000", "10.0050", "10.0000", "9.9800", "9.9850", "9.9900", "9.9890", "9.9700", "9.9850", "9.9800", "9.9950", "9.9950", "9.9850", "9.9650", "9.9750", "9.9650", "9.9850", "9.9750", "9.9650", "9.9750", "10.0000", "10.0900", "9.9569", "10.0975", "10.0400", "10.0963", "10.0600", "10.0500", "10.0550", "10.0100", "10.0310", "10.0450", "10.0700", "10.0715", "10.0850", "10.1245", "10.1200", "10.1000", "10.1050", "10.1100", "10.1100", "10.1010", "10.1100", "10.1190", "10.1350", "10.1200", "10.1200", "10.0750", "10.0910"
];

const chartData = {
  labels: ["2017-07-19", "2017-07-20", "2017-07-21", "2017-07-24", "2017-07-25", "2017-07-26", "2017-07-27"],
  datasets: [{
    label: 'My First dataset',
    fill: false,
    lineTension: 0.1,
    borderColor: '#30cd9a',
    borderWidth: 2,
    pointRadius: 1,
    data: intradayPricePoints,
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
        display: true,
      }
    }],
  },
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSeries: 'Today',
    };
  }

  componentWillMount() {
    const { getIntraday, selectedCompany } = this.props;
    console.log('CHART WILL MOUNTS WITH PROPS: ', this.props);
    getIntraday(selectedCompany.symbol);
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
