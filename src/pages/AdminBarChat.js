// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField
// } from "@mui/material";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import apiRequest from "../utilities/ApiRequest";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function AdminBarChat() {
//   const [chartData, setChartData] = useState(null);
//   const [selectedBar, setSelectedBar] = useState(null); // For selected bar details
//   const [modalOpen, setModalOpen] = useState(false);
//   const [city, setCity] = useState("");
//   const [numbers, setNumbers] = useState("");

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://localhost:7047/GetAllAnalysis");
//         const data = await response.json();

//         const labels = data.map((item) => item.city);
//         const numbers = data.map((item) => parseInt(item.numbers, 10));

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Analysis Data",
//               data: numbers,
//               backgroundColor: "rgba(54, 162, 235, 0.6)",
//               borderColor: "rgba(54, 162, 235, 1)",
//               borderWidth: 2
//             }
//           ]
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleBarClick = (event, element) => {
//     if (element.length > 0) {
//       const index = element[0].index;
//       const barCity = chartData.labels[index];
//       const barNumber = chartData.datasets[0].data[index];
//       setSelectedBar({ index, city: barCity, numbers: barNumber });
//       setCity(barCity);
//       setNumbers(barNumber);
//       setModalOpen(true);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       await fetch("https://localhost:7047/UpdateAnalysis", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           id: selectedBar.index + 1, // Assuming id matches index+1
//           city,
//           numbers
//         })
//       });
//       alert("Updated successfully!");
//       setModalOpen(false);
//       window.location.reload(); // Refresh data
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       let id= selectedBar.index + 1
//       await apiRequest(`/RemoveReport?${id}`,"POST");
//       alert("Deleted successfully!");
//       setModalOpen(false);
//       window.location.reload(); // Refresh data
//     } catch (error) {
//       console.error("Error deleting data:", error);
//     }
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: "Analysis Data across Cities"
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) => `${tooltipItem.raw}`
//         }
//       }
//     },
//     onClick: handleBarClick // Attach click handler
//   };

//   return (
//     <>
//       <Header />
//       <div className="chart-container" style={{ height: "100vh" }}>
//         {chartData ? (
//           <Bar data={chartData} options={options} />
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>

//       {/* Modal for Update and Delete */}
//       <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
//         <DialogTitle>Manage Data</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="City"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Numbers"
//             value={numbers}
//             onChange={(e) => setNumbers(e.target.value)}
//             fullWidth
//             margin="dense"
//             type="number"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleUpdate} color="primary" variant="contained">
//             Update
//           </Button>
//           <Button onClick={handleDelete} color="secondary" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Footer />
//     </>
//   );
// }

// export default AdminBarChat;


// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField
// } from "@mui/material";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function AdminBarChat() {
//   const [chartData, setChartData] = useState(null);
//   const [selectedBar, setSelectedBar] = useState(null); // For selected bar details
//   const [modalOpen, setModalOpen] = useState(false);
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [cityName, setCity] = useState("");
//   const [content, setNumbers] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://localhost:7047/GetAllAnalysis"
//       );
//       const dataa = await response.json();
  
//       const labels = dataa.map((item) => item.cityName);
//       const data = dataa.map((item) => parseInt(item.content, 10));
  
//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: "Analysis Data",
//             data: data,
//             backgroundColor: "rgba(54, 162, 235, 0.6)",
//             borderColor: "rgba(54, 162, 235, 1)",
//             borderWidth: 2,
//           },
//         ],
//         rawData: dataa, // Store raw API data for reference
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       "https://localhost:7012/API/CityReport/CityReport"
//   //     );
//   //     const dataa = await response.json();

//   //     const labels = dataa.map((item) => item.cityName);
//   //     const data = dataa.map((item) => parseInt(item.content, 10));

//   //     setChartData({
//   //       labels,
//   //       datasets: [
//   //         {
//   //           label: "Analysis Data",
//   //           data: data,
//   //           backgroundColor: "rgba(54, 162, 235, 0.6)",
//   //           borderColor: "rgba(54, 162, 235, 1)",
//   //           borderWidth: 2
//   //         }
//   //       ]
//   //     });
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //   }
//   // };

//   const handleBarClick = (event, element) => {
//     if (element.length > 0) {
//       const index = element[0].index;
//       const barCity = chartData.labels[index];
//       const barNumber = chartData.datasets[0].data[index];
//       const selectedData = chartData.rawData[index]; // Use rawData to store original API data
//       setSelectedBar({ id: selectedData.id, cityName: barCity, content: barNumber });
//       setCity(barCity);
//       setNumbers(barNumber);
//       setModalOpen(true);
//     }
//   };

//   const handleUpdate = async () => {
//     let toConver = String(content);
//     try {
//       await fetch("https://localhost:7047/UpdateAnalysis", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           id: selectedBar.id, // Assuming id matches index+1
//           cityName,
//           content: toConver
//         })
//       });
//       alert("Updated successfully!");
//       setModalOpen(false);
//       fetchData(); // Refresh data
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const id = selectedBar.id; // Use the correct id
//       await fetch(`https://localhost:7047/RemoveReport?id=${id}`, {
//         method: "POST",
//       });
//       alert("Deleted successfully!");
//       setModalOpen(false);
//       fetchData(); // Refresh data
//     } catch (error) {
//       console.error("Error deleting data:", error);
//     }
//   };

//   const handleCreate = async () => {
//     try {
//       await fetch("https://localhost:7047/CreateAnalysis", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cityName,
//           content
//         })
//       });
//       alert("Created successfully!");
//       setCreateModalOpen(false);
//       fetchData(); // Refresh data
//     } catch (error) {
//       console.error("Error creating data:", error);
//     }
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: "Analysis Data across Cities"
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) => `${tooltipItem.raw}`
//         }
//       }
//     },
//     onClick: handleBarClick // Attach click handler
//   };

//   return (
//     <>
//       <Header />
//       <div className="chart-container" style={{ height: "100vh" }}>
//         <Button
//           variant="contained"
//           color="primary"
//           style={{ position: "absolute", right: 20, top: 100 }}
//           onClick={() => setCreateModalOpen(true)}
//         >
//           Create Report
//         </Button>
//         {chartData ? (
//           <Bar data={chartData} options={options} />
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>

//       {/* Modal for Update and Delete */}
//       <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
//         <DialogTitle>Manage Data</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="City"
//             value={cityName}
//             onChange={(e) => setCity(e.target.value)}
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Numbers"
//             value={content}
//             onChange={(e) => setNumbers(e.target.value)}
//             fullWidth
//             margin="dense"
//             type="number"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleUpdate} color="primary" variant="contained">
//             Update
//           </Button>
//           <Button onClick={handleDelete} color="secondary" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Modal for Create */}
//       <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
//         <DialogTitle>Create Report</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="City"
//             value={cityName}
//             onChange={(e) => setCity(e.target.value)}
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Numbers"
//             value={content}
//             onChange={(e) => setNumbers(e.target.value)}
//             fullWidth
//             margin="dense"
//             type="number"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCreate} color="primary" variant="contained">
//             Create
//           </Button>
//           <Button onClick={() => setCreateModalOpen(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <footer
//         style={{
//           backgroundColor: "#f8f9fa",
//           textAlign: "center",
//           padding: "10px",
//           marginTop: "auto"
//         }}
//       >
//         <Footer />
//       </footer>
//     </>
//   );
// }

// export default AdminBarChat;





import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminBarChat() {
  const [chartData, setChartData] = useState(null);
  const [selectedBar, setSelectedBar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [cityName, setCityName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:7047/GetAllAnalysis");
      const data = await response.json();

      const labels = data.map((item) => item.city);
      const dataPoints = data.map((item) => parseInt(item.numbers, 10));

      setChartData({
        labels,
        datasets: [
          {
            label: "Analysis Data",
            data: dataPoints,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          },
        ],
        rawData: data, // Store raw API data for reference
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const selectedData = chartData.rawData[index];
      setSelectedBar({ id: selectedData.id, city: selectedData.city, numbers: selectedData.numbers });
      setCityName(selectedData.city);
      setContent(selectedData.numbers);
      setModalOpen(true);
    }
  };

  const handleUpdate = async () => {
    try {
      await fetch(`https://localhost:7047/UpdateAnalysis?Id=${selectedBar.id}&City=${cityName}&Numbers=${content}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      alert("Updated successfully!");
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`https://localhost:7047/RemoveReport?id=${selectedBar.id}`, {
        method: "POST",
      });
      alert("Deleted successfully!");
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await fetch(`https://localhost:7047/CreateAnalysis?City=${cityName}&Numbers=${content}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      alert("Created successfully!");
      setCreateModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Analysis Data across Cities",
      },
    },
    onClick: handleBarClick,
  };

  return (
    <>
      <Header />
      <div style={{ padding: "20px" ,marginTop:"50px"}}>
        <Button variant="contained" onClick={() => setCreateModalOpen(true)}>
          Add New Data
        </Button>
        {chartData && <Bar data={chartData} options={options} />}
      </div>

      {/* Edit Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          <TextField
            label="City Name"
            fullWidth
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Numbers"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
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

      {/* Create Modal */}
      <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <DialogTitle>Add New Data</DialogTitle>
        <DialogContent>
          <TextField
            label="City Name"
            fullWidth
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Numbers"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </>
  );
}

export default AdminBarChat;
