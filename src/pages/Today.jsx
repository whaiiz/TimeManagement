import React, {useEffect, useState} from 'react'
import Navbar from '../components/common/Navbar'
import TimerComponent from '../components/tasks/Timer'
import TodayTasksList from '../components/tasks/TodayTaskList'
import { getTasks} from '../business-layer/tasks';
import { getUserLoggedInToken } from  '../business-layer/authentication';
import '../styles/pages/today.css'

export default function Today() {
    const [todaysTasks, setTodaysTasks] = useState([]);

    useEffect(() => {
        if (!getUserLoggedInToken()) window.location.href = '/Login';

        getTasks().then(r => {
            if(r.status === 200) {
                setTodaysTasks(r.tasks);
            }
        });
    }, [setTodaysTasks])
    
    return(
        <React.Fragment>
            <Navbar />
            <TimerComponent />
            <TodayTasksList todaysTasks = {todaysTasks} />
        </React.Fragment>
    );
}
