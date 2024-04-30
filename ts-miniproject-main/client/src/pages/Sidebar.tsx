import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SideBar.css'

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="sidebar"> {/* Add the sidebar class here */}
      <ul>
        <li className="nav-item">
          <a className =' nav-head' onClick={() => handleNavigation('/dashboard')}>
            <h4>Dashboard</h4>
          </a>
        </li>
        <li className="nav-item">
          <a onClick={() => handleNavigation('/users')}>
            <h4>Users</h4>
          </a>
        </li>
        <li className="nav-item">
          <a onClick={() => handleNavigation('/loan')}>
            <h4>Loan</h4>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
