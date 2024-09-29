// src/components/Chart.js
import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import axios from 'axios';

const ChartComponent = () => {
  useEffect(() => {
    // Function to create the Chart.js chart
    function createChart(data) {
      var ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map((item) => item.title),
          datasets: [
            {
              data: data.map((item) => item.budget),
              backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19', '#4bc0c0', '#9966ff', '#c9cbcf'],
            },
          ],
        },
      });
    }

    // Function to create the D3.js chart
    function createD3Chart(data) {
      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;

      const svg = d3.select('#d3Chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const color = d3.scaleOrdinal().domain(data.map(d => d.title)).range(d3.schemeCategory10);

      const pie = d3.pie().value(d => d.budget);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g').attr('class', 'arc');

      arcs.append('path').attr('d', arc).attr('fill', d => color(d.data.title));

      arcs.append('text').attr('transform', d => `translate(${arc.centroid(d)})`).attr('text-anchor', 'middle').text(d => d.data.title);
    }

    // Fetch the budget data from the backend and create charts
    axios.get('/budget').then((response) => {
      createChart(response.data.myBudget); // Create the Chart.js chart
      createD3Chart(response.data.myBudget); // Create the D3.js chart
    });
  }, []);

  return (
    <div>
      <div className="text box">
        <h1>Budget Chart (Chart.js)</h1>
        <canvas id="myChart" width="200" height="200"></canvas>
      </div>
      <div id="d3Chart">
        <h1>Budget Chart (D3.js)</h1>
      </div>
    </div>
  );
};

export default ChartComponent;
