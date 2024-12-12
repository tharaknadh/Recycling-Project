import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiRequest from "../utilities/ApiRequest";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminBarChat() {
  const [chartData, setChartData] = useState(null);
  const [selectedBar, setSelectedBar] = useState(null); // For selected bar details
  const [modalOpen, setModalOpen] = useState(false);
  const [city, setCity] = useState("");
  const [numbers, setNumbers] = useState("");

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7047/GetAllAnalysis");
        const data = await response.json();

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
              borderWidth: 2
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBarClick = (event, element) => {
    if (element.length > 0) {
      const index = element[0].index;
      const barCity = chartData.labels[index];
      const barNumber = chartData.datasets[0].data[index];
      setSelectedBar({ index, city: barCity, numbers: barNumber });
      setCity(barCity);
      setNumbers(barNumber);
      setModalOpen(true);
    }
  };

  const handleUpdate = async () => {
    try {
      await fetch("https://localhost:7047/UpdateAnalysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedBar.index + 1, // Assuming id matches index+1
          city,
          numbers
        })
      });
      alert("Updated successfully!");
      setModalOpen(false);
      window.location.reload(); // Refresh data
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      let id= selectedBar.index + 1
      await apiRequest(`/RemoveReport?${id}`,"POST");
      alert("Deleted successfully!");
      setModalOpen(false);
      window.location.reload(); // Refresh data
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      title: {
        display: true,
        text: "Analysis Data across Cities"
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}`
        }
      }
    },
    onClick: handleBarClick // Attach click handler
  };

  return (
    <>
      <Header />
      <div className="chart-container" style={{ height: "100vh" }}>
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Modal for Update and Delete */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Manage Data</DialogTitle>
        <DialogContent>
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Numbers"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            fullWidth
            margin="dense"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Update
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </>
  );
}

export default AdminBarChat;
