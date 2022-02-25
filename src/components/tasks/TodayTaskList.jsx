import React, { useEffect, useState } from 'react'
import { getTasks } from '../../business-layer/tasks'
import '../../styles/components/tasks/today-task-list.css'

export default function TodayTasksList() {
    const [todayTasks, setTodayTasks] = useState([]);
    
    useEffect(() => {
        getTasks().then(response => {
            if (response.success) setTodayTasks(response.tasks);
        });
    }, [])
    
    
    return (
        <React.Fragment>
            <ul>
                {todayTasks.map(t => {
                    <li>
                        
                    </li>       
                })}
            </ul>
        </React.Fragment>
    );
}
