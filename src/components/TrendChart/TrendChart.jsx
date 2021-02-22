// React
import React, { useEffect } from "react";

// Chart JS import
import { Line } from "react-chartjs-2";

// MUI
import Paper from "@material-ui/core/Paper";

function TrendChart({ meals }) {

  // UseEffect to render chart and redraw on meal change
  useEffect(() => {
    chart();
  }, [meals]);

  // Labels for X axis
  const labels = meals.map((meal) => {
    return new Date(meal.date).toLocaleDateString("en-us", {
      month: "numeric",
      day: "numeric",
    });
  });

  // Values
  const values = meals?.map((meal) => {
    return meal.cost_per_meal.toFixed(2);
  });

  // Make the chart!
  const chart = (canvas) => {
    const ctx = canvas?.getContext("2d"); // Get context for gradient
    
    // Make gradient
    const gradient = ctx?.createLinearGradient(0, 0, 0, 140);
    gradient?.addColorStop(0, "rgba(191, 54, 12, 0.6)");
    gradient?.addColorStop(1, "rgba(191, 54, 12, 0.2)");

    // Chart options here:
    return {
      labels: labels,
      datasets: [
        {
          label: "Cost Per Meal",
          data: values,
          backgroundColor: gradient,
          borderColor: ["#f9683a"],
          borderWidth: 1,
          pointBorderColor: "#999",
          pointBackgroundColor: "rgba(191, 54, 12, 0.1)",
        },
      ],
    };
  };

  // Chart globals
  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.defaultFontColor = "#fff";

  return (
    <Paper>
      <Line data={chart} redraw />
    </Paper>
  );
}

export default TrendChart;
