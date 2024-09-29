import React, { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PieController
} from 'chart.js';
import * as d3 from 'd3';
import './Chart.scss';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PieController);

const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const chartInstance = useRef(null); // Ref to keep track of Chart.js instance
  const chartRendered = useRef(false); // Ref to ensure D3 is only rendered once

  useEffect(() => {
    // Mock data for the charts
    const mockData = [
      { title: 'Rent', budget: 500 },
      { title: 'Groceries', budget: 300 },
      { title: 'Utilities', budget: 150 },
      { title: 'Entertainment', budget: 100 },
      { title: 'Transportation', budget: 200 },
      { title: 'Savings', budget: 250 }
    ];

    setChartData(mockData);
    createChart(mockData);

    // Use ref `chartRendered` to ensure D3 is only rendered once
    if (!chartRendered.current) {
      createD3Chart(mockData);
      chartRendered.current = true;
    }

    // Cleanup function to destroy the Chart.js instance on component unmount and remove SVG elements
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      d3.select('#d3Chart').selectAll('*').remove();
    };
  }, []);

  // Function to create the Chart.js pie chart
  const createChart = (data) => {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Destroy existing chart instance if it exists to avoid "Canvas is already in use" error
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ChartJS(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item.title),
        datasets: [{
          data: data.map(item => item.budget),
          backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19', '#4bc0c0', '#9966ff', '#c9cbcf'],
        }]
      }
    });
  };

  // Function to create the D3.js chart
  const createD3Chart = (data) => {
    console.log("Creating D3.js chart with data:", data);

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Remove any existing SVG elements before creating the chart
    d3.select('#d3Chart').selectAll('*').remove();

    const svg = d3.select('#d3Chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    console.log("SVG created successfully");

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d.budget);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.title))
      .attr('stroke', '#000')  // Add a black border to the arcs for better visibility
      .attr('stroke-width', 1);

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('fill', '#000')  // Ensure text is black and visible
      .text(d => d.data.title);

    console.log("D3.js chart created successfully");
  };

  return (
    <div>
      <div className="text-box">
        <h1>Budget Chart (Chart.js)</h1>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
      <div id="d3Chart">
        <h1>Budget Chart (D3.js)</h1>
      </div>
    </div>
  );
};

export default ChartComponent;
