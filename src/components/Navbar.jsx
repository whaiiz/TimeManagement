import React, {useState, useEffect} from 'react'
import '../styles/navbar.css';

export default function Navbar() {
    return(
        <nav className="menu">
            <ul className="navbar-items">
                <li>
                    <a className="task-link" href="#tasks">
                        <i className="fas fa-tasks task-icon"></i>
                    </a>
                    <span className="task-tooltip">Tasks</span>
                </li>
                <li>
                    <a className="calendar-link" href="#calendar">
                        <i className="fas fa-calendar calendar-icon"></i>
                    </a>
                    <span className="calendar-tooltip">Calendar</span>
                </li>
            </ul>
        </nav>
    )
}