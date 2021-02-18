import React, { useEffect } from "react";

import { Line } from "react-chartjs-2";

import Paper from "@material-ui/core/Paper";

function TrendChart({ meals }) {
  const labels = meals.map((meal) => {
    return new Date(meal.date).toLocaleDateString("en-us", {
      month: "numeric",
      day: "numeric",
    });
  });

  const values = meals?.map((meal) => {
    return meal.cost_per_meal.toFixed(2);
  });

  const chart = (canvas) => {
    const ctx = canvas?.getContext("2d");
    const gradient = ctx?.createLinearGradient(0, 0, 0, 140);

    gradient?.addColorStop(0, "rgba(191, 54, 12, 0.6)");

    gradient?.addColorStop(1, "rgba(191, 54, 12, 0.2)");

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

  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.defaultFontColor = "#fff";

  useEffect(() => {
    chart();
  }, [meals]);

  return (
    <Paper>
      <Line data={chart} redraw />
    </Paper>
  );
}

export default TrendChart;
