import React, { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";

function TrendChart({meals}) {
  const [data, setData] = useState({});

  const chart = () => {
    setData({
      labels: labels,
      datasets: [
        {
          label: "Cost Per Meal",
          data: values,
        },
      ],
    });
  };

  const labels = meals.map((meal) => {
    return new Date(meal.date).toLocaleDateString("en-us");
  });

  const values = meals?.map((meal) => {
    return meal.cost_per_meal.toFixed(2);
  });

  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default TrendChart;