import React, { useState } from 'react'
import '../../styles/components/tasks/today-task-list.css'

export default function TodayTasksList({tasks}) {
    const completeTask = (id) => {
        console.log(id); 
    }
   
    return (
        <React.Fragment>
            <ul className='today-tasks-list'>
                {tasks.map((t, i) => {
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
