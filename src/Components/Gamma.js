import React, { Component } from "react";
import data from "./data.json";

class GammaStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: data,
      classStats: [],
    };
  }

  componentDidMount() {
    // Calculate "Gamma" property for each data point
    const datasetWithGamma = this.state.dataset.map((item) => ({
      ...item,
      Gamma: (item.Ash * item.Hue) / item.Magnesium,
    }));

    // Organize the data into classes
    const classes = Array.from(
      new Set(datasetWithGamma.map((item) => item.Alcohol))
    );

    // Calculate class-wise statistics for "Gamma"
    const classStats = classes.map((alcoholClass) => {
      const classData = datasetWithGamma.filter(
        (item) => item.Alcohol === alcoholClass
      );
      const gammas = classData.map((item) => item.Gamma);

      return {
        class: alcoholClass,
        mean: this.calculateMean(gammas),
        median: this.calculateMedian(gammas),
        mode: this.calculateMode(gammas),
      };
    });

    this.setState({ classStats });
  }

  // Calculate mean
  calculateMean(data) {
    const sum = data.reduce((acc, value) => acc + parseFloat(value), 0);
    return sum / data.length;
  }

  // Calculate median
  calculateMedian(data) {
    const sortedData = data.sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      return (
        (parseFloat(sortedData[middle - 1]) + parseFloat(sortedData[middle])) /
        2
      );
    } else {
      return parseFloat(sortedData[middle]);
    }
  }

  // Calculate mode
  calculateMode(data) {
    const count = {};
    let mode = null;
    let maxCount = 0;

    data.forEach((value) => {
      count[value] = (count[value] || 0) + 1;
      if (count[value] > maxCount) {
        maxCount = count[value];
        mode = value;
      }
    });

    return parseFloat(mode);
  }

  render() {
    const tableStyle = {
      border: "1px solid #ccc",
      margin: "0 auto", // Center the table on the page
    };

    const thStyle = {
      border: "1px solid #ccc",
      padding: "8px",
    };

    const tdStyle = {
      border: "1px solid #ccc",
      padding: "8px",
    };
    return (
      <div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Measure</th>
              {this.state.classStats.map((stats) => (
                <th key={stats.class} style={thStyle}>
                  Class {stats.class}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Gamma Mean</td>
              {this.state.classStats.map((stats) => (
                <td key={stats.class} style={tdStyle}>
                  {stats.mean.toFixed(3)}
                </td>
              ))}
            </tr>
            <tr>
              <td style={tdStyle}>Gamma Median</td>
              {this.state.classStats.map((stats) => (
                <td key={stats.class} style={tdStyle}>
                  {stats.median.toFixed(3)}
                </td>
              ))}
            </tr>
            <tr>
              <td style={tdStyle}>Gamma Mode</td>
              {this.state.classStats.map((stats) => (
                <td key={stats.class} style={tdStyle}>
                  {stats.mode.toFixed(3)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default GammaStatistics;
