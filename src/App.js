import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signin from './pages/Signin';
import PrivateRoute from './utilities/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ContactUs from './pages/Contactus';
import Feedback from './pages/FeedBack';
import ContactList from './pages/ContactList';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Event from './pages/Event';
import BarChart from './pages/BarChart';
import Stories from './pages/Stories';
import Donation from './pages/Donation';
import AdminHome from './pages/AdminHome';
import Ideas from './pages/Ideas';
import Homepage from './pages/Homepage';

function App() {
  // Helper function to check if a user is logged in and get their role
  const isAuthenticated = () => localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  // Admin Route component to handle role-based routing
  const AdminRoute = ({ element }) => (
    isAuthenticated() && userRole === "Admin" ? element : <Navigate to="/notfound" replace />
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/signin"
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Signin />}
        />
        <Route
          path="/signin"
          element={
            localStorage.getItem("authToken") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signin />
            )
          }
        />
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Home />}
        />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/aboutUs" element={<PrivateRoute element={<About />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        
        {/* Admin-only route for ContactList */}
        <Route path="/contactlist" element={<AdminRoute element={<ContactList />} />} />
        
        <Route
          path="*"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <NotFound />}
        />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/donation" element={<Donation/>}/>
        <Route path="/aboutUs" element={<PrivateRoute element={<About />} />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/list" element={<ContactList/>}/>
        <Route path="/event" element={<Event/>}/>
        <Route path="/chart" element={<BarChart/>}/>
        <Route path="/stories" element={<Stories/>}/>
        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/ideas" element={<Ideas/>}/>
        <Route path="homepage" element={<Homepage/>}/>

        <Route
          path="*"
          element={
            localStorage.getItem("authToken") ? (
              <Navigate to="/dashboard" />
            ) : (
              <NotFound />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
