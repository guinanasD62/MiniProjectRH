import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../auth/auth-context';

const Navigation: React.FC = () => {
  const { isAuthenticated, logout, login } = useAuth();
  const username = useSelector((state: RootState) => state.session.username);

  return (
    <Navbar bg="dark" variant="dark" style={{ padding: '60px', height: '90px' }} >
      <Navbar.Brand> <h1>LOAN PROJECT</h1></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {isAuthenticated ? (
            <NavDropdown title={username || 'User'} id="basic-nav-dropdown" style={{color: '#ece5e5', fontSize: '20px'}}>
              <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link onClick={() => login("yourToken", "yourUsername")}>Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
