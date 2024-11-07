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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem("authToken") ? (
              <Navigate to="/home" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signin"
          element={
            localStorage.getItem("authToken") ? (
              <Navigate to="/home" replace />
            ) : (
              <Signin />
            )
          }
        />
         <Route
          path="/"
          element={
            localStorage.getItem("authToken") ? (
              <Navigate to="/home" replace />
            ) : (
              <Home />
            )
          }
        />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/aboutUs" element={<PrivateRoute element={<About />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>}/>} />
        <Route path="/list" element={<ContactList/>}/>
        <Route
          path="*"
          element={
            localStorage.getItem("authToken") ? (
              <Navigate to="/home" />
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
