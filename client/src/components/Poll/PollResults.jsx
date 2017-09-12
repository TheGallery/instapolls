import React from 'react';
import { Pie } from 'react-chartjs-2';

function normalizeData (data) {
  const initObj = {
    datasets: [{
      data: []
    }],
    labels: []
  };

  return data.reduce((prev, cur) => {
    return {
      datasets: [{
        data: [...prev.datasets[0].data, cur.votes]
      }],
      labels: [...prev.labels, cur.name]
    };
  }, initObj);
}

function PollResults ({data}) {
  return (
    <Pie data={normalizeData(data)} />
  );
}

export default PollResults;
