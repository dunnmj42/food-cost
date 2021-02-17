import React, { useEffect } from "react";

import { Line } from "react-chartjs-2";

import Paper from "@material-ui/core/Paper"

function TrendChart({meals}) {

  const labels = meals.map((meal) => {
    return new Date(meal.date).toLocaleDateString("en-us", {month: "numeric", day: "numeric"});
  });

  const values = meals?.map((meal) => {
    return meal.cost_per_meal.toFixed(2);
  });

  const chart = canvas => {
    const ctx = canvas?.getContext('2d');
    const gradient = ctx?.createLinearGradient(0, 0, 0, 140)

    gradient?.addColorStop(0, "rgba(0, 96, 100, 0.5)");

    gradient?.addColorStop(1, "rgba(0, 96, 100, 0.1)");
    
    return {
      labels: labels,
      datasets: [
        {
          label: "Cost Per Meal",
          data: values,
          backgroundColor: gradient,
          borderColor: [
            '#428e92',
          ],
          borderWidth: 1,
          pointBorderColor: "#999",
          pointBackgroundColor: "rgba(173, 53, 186, 0.1)",
        },
      ],
    };
  };

  Chart.defaults.global.legend.display = false;

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