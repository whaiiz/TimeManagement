import React from 'react'
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return(
        <nav className="menu">
            <ul className="navbar-items">
                <li>
                    <Link to='/' className="task-link">
                        <i className="fas fa-tasks task-icon"></i>
                    </Link>
                    <span className="task-tooltip">Tasks</span>
                </li>
                <li>
                    <Link to='/calendar' className="calendar-link">
                        <i className="fas fa-calendar calendar-icon"></i>
                    </Link>
                    <span className="calendar-tooltip">Tomorrow plan</span>
                </li>
            </ul>
        </nav>
    )
}