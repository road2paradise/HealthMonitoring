import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  userName: string;
  handleUserInput?: (user: string) => void;
}

// 'HeaderProps' describes the shape of props.
// state is never set so we use the '{}' type.
function Header(Props: HeaderProps) {
  const { userName } = Props;

  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light" sticky="top">
        <Navbar.Brand>
          <Link to="/">
            <img
              src={Logo}
              width="50"
              height="50"
              alt="healthy-org-logo"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {userName === "null" ? (
              <Link to="/SignIn">Sign in</Link>
            ) : (
              <Navbar>
                <Navbar.Text>
                  <Link to="/dashboard">
                    <li className="link">My Dashboard</li>
                  </Link>
                  <Link to="/Appointment">
                    <li className="link">Add new Appointment</li>
                  </Link>
                  <Link to="/Appointment">
                    <li className="link">Sign Out (Not Working)</li>
                  </Link>
                </Navbar.Text>
              </Navbar>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default Header;
