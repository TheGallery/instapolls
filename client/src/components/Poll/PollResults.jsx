import React from 'react';
import { Pie } from 'react-chartjs-2';

function normalizeData (data) {
  const initObj = {
    datasets: [{
      data: [],
      backgroundColor: []
    }],
    labels: []
  };

  return data.reduce((prev, cur, idx) => {
    return {
      datasets: [{
        data: [...prev.datasets[0].data, cur.votes],
        backgroundColor: [
          ...prev.datasets[0].backgroundColor,
          `hsla(${idx * 30}, 100%, 62%, 1)`
        ]
      }],
      labels: [...prev.labels, cur.name]
    };
  }, initObj);
}

function PollResults ({data}) {
  console.log(normalizeData(data));
  return (
    <Pie data={normalizeData(data)} />
  );
}

export default PollResults;
