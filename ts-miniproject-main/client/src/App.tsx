import React from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import { AuthProvider } from './auth/auth-context';
import Sidebar from './pages/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import LoanTable from './pages/LoanTable';
import PrivateRoute from './auth/private-route';
import Navigation from './pages/navbar';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Register.css'



const App: React.FC = () => {
  
  const location = useLocation();
  const noNavbarRoutes = ['/', '/register'];
  const showNavbarAndSidebar = !noNavbarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      {showNavbarAndSidebar && <Navigation />} {/* This will be fixed to the top */}
      <div className="d-flex" > {/* Add padding if Navbar is present */}
        {showNavbarAndSidebar && (
          <div className="sidebar">
            <Sidebar />
          </div>
        )}
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login/>} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/users" element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            } />

          
            <Route path="/loan" element={
              <PrivateRoute>
                <LoanTable /> 
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
