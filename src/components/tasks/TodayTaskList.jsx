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
            if (response.success) setTodayTasks(response.tasks);
        });
    }, [])
    
    return (
        <React.Fragment>
            <ul className='today-tasks-list'>
                {todayTasks.map((t, i) => {
                    return (
                        <li key={i}>
                            <label className={t.status === 'Done' ? 'task-done': ''}>{t.name}</label>
                            <section className='today-task-operations'>
                                {t.status !== 'Done' && <i className="fas fa-check-circle" onClick={e => completeTask(e, t.id)}></i>}
                            </section>
                        </li>
                    )       
                })}
            </ul>
        </React.Fragment>
    );
}
