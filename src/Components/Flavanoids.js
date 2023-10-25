import React from "react";
import data from "./data.json";

class FlavanoidStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data, // Your dataset goes here
      classStats: [], // Array to store class-wise statistics
    };
  }

  componentDidMount() {
    // Organize the data into classes
    const classes = Array.from(
      new Set(this.state.data.map((item) => item.Alcohol))
    );

    // Calculate class-wise statistics
    const classStats = classes.map((alcoholClass) => {
      const classData = this.state.data.filter(
        (item) => item.Alcohol === alcoholClass
      );
      const flavanoids = classData.map((item) => item.Flavanoids);

      return {
        class: alcoholClass,
        mean: this.calculateMean(flavanoids),
        median: this.calculateMedian(flavanoids),
        mode: this.calculateMode(flavanoids),
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
              <td style={tdStyle}>Flavanoids Mean</td>
              {this.state.classStats.map((stats) => (
                <td key={stats.class} style={tdStyle}>
                  {stats.mean.toFixed(2)}
                </td>
              ))}
            </tr>
            <tr>
              <td style={tdStyle}>Flavanoids Median</td>
              {this.state.classStats.map((stats) => (
                <td key={stats.class} style={tdStyle}>
                  {stats.median.toFixed(2)}
                </td>
              ))}
            </tr>
            <tr>
              <td style={tdStyle}>Flavanoids Mode</td>
              {this.state.classStats.map((stats) => (
                <td key={stats.class} style={tdStyle}>
                  {stats.mode.toFixed(2)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default FlavanoidStatistics;
