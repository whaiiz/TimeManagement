import React, { useEffect, useState } from 'react'
import { getTasks } from '../../business-layer/tasks'
import '../../styles/components/tasks/today-task-list.css'

export default function TodayTasksList() {
    const [todayTasks, setTodayTasks] = useState([]);
    
    const completeTask = (id) => {
        console.log(id); 
    }

    useEffect(() => {
        getTasks().then(response => {
            console.log(response);
            if (response.success) setTodayTasks(response.tasks);
        });
    }, [])
    
    return (
        <React.Fragment>
            <ul>
                {todayTasks.map((t, i) => {
                    return (
                        <li key={i}>
                            <label>{t.name}</label>
                            {t.status === 'Active' && <i className="fas fa-check-circle" onClick={e => completeTask(e, t.id)}></i>}
                        </li>
                    )       
                })}
            </ul>
        </React.Fragment>
    );
}
