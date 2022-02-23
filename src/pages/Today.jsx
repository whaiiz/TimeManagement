import React from 'react'
import Navbar from '../components/common/Navbar'
import TimerComponent from '../components/tasks/Timer'
import TodayTasksList from '../components/tasks/TodayTaskList'
import '../styles/pages/today.css'

export default function Today() {
    return(
        <React.Fragment>
            <Navbar />
            <TimerComponent />
            <TodayTasksList />
        </React.Fragment>
    );
}
