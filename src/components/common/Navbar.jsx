import React from 'react'
import '../../styles/common/navbar.css';
import { Link } from 'react-router-dom';
import { logout } from '../../business-layer/authentication.js'
export default function Navbar() {

    let handleLogout = () => {
        logout().then(_ => window.location.href = '/Login');
    }

    return(
        <nav className="menu">
            <ul className="navbar-items">
                <li>
                    <Link to='/' className="today-link">
                        <i className="fas fa-clock today-icon"></i>
                    </Link>
                    <span className="today-tooltip">Today</span>
                </li>
                <li>
                    <Link to='/Tasks' className="task-link">
                        <i className="fas fa-tasks task-icon"></i>
                    </Link>
                    <span className="task-tooltip">Tasks</span>
                </li>
                <li>
                    <Link to='/Planning' className="calendar-link">
                        <i className="fas fa-calendar calendar-icon"></i>
                    </Link>
                    <span className="calendar-tooltip">Planning</span>
                </li>
                <li>
                    <span onClick={handleLogout} className="logout-link">
                        <i className="fas fa-door-open logout-icon"></i>
                    </span>
                    <span className="logout-tooltip">Log out</span>
                </li>
            </ul>
        </nav>
    )
}