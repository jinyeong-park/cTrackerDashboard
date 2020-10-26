import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral"

const options = {
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooptipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function(value, index, values) {
            return numeral(value).format("0a")
          },
        },
      },
    ],
  },
};


const buildChartData = (data, casesType='cases') => {
  const chartData = [];
  let lastDataPoint;
  // data.cases.forEach((data) => {
    for (let date in data.cases) {
      if (lastDataPoint) {
        // today's new cases
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      // lastDataPoint = data['cases'][date];
      lastDataPoint = data[casesType][date];
    };
    return chartData;
};

function LineGraph() {

  const [data, setData] = useState({})


  useEffect(() => {
    const fetchData = async () => {
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          // console.log('response of lastdays', data)
          const chartData = buildChartData(data, "cases");
          setData(chartData);
          console.log(chartData)
        });
    }
    fetchData();
  }, []);

  return (
    <div className="map">
      {/* if data is not undefined & length is not 0 */}
      {data?.length > 0 && (
      <Line
        options={options}
        data={{
          datasets: [
            {
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              borderColor: '#CC1034',
              data: data,
            }
          ]
        }}
      />
      )}
    </div>

  );
}

export default LineGraph;