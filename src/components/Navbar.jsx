import React, {useState, useEffect} from 'react'
import '../styles/work-items-list.css';
import '../styles/navbar.css';

export default function Navbar() {
    return(
        <nav class="menu">
            <ul class="navbar-items">
                <li>
                    <a className="task-link" href="#tasks">
                        <i className="fas fa-tasks task-icon"></i>
                    </a>
                    <span class="task-tooltip">Tasks</span>
                </li>
                <li>
                    <a class="calendar-link" href="#calendar">
                        <i className="fas fa-calendar calendar-icon"></i>
                    </a>
                    <span class="calendar-tooltip">Calendar</span>
                </li>
            </ul>
        </nav>
    )
}