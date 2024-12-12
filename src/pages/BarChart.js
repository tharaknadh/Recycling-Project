import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "../css/Chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getApiRequest } from "../utilities/ApiRequest";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await getApiRequest("/GetAllAnalysis","GET");
        const data = await response

        // Transform the data for Chart.js
        const labels = data.map((item) => item.city);
        const numbers = data.map((item) => parseInt(item.numbers, 10));

        setChartData({
          labels,
          datasets: [
            {
              label: "Analysis Data",
              data: numbers,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Clean up Chart instances on unmount
    return () => {
      if (window.Chart && window.Chart.instances) {
        window.Chart.instances.forEach((chartInstance) => {
          chartInstance.destroy();
        });
      }
    };
  }, []);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Analysis Data across Cities",
        font: {
          size: 25,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <>
      <Header />
      <div className="chart-container" style={{ height: "100vh" }}>
        {chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}
      </div>
      <Footer />
    </>
  );
}