import React from 'react'
import '../../styles/components/tasks/today-task-list.css'

export default function TodayTasksList({tasks, completeTaskCb}) {
    return (
        <React.Fragment>
            <ul className='today-tasks-list'>
                {tasks.map((t, i) => {
                    return (
                        <li key={i}>
                            <label className={t.status === 'Done' ? 'task-done': ''}>{t.name}</label>
                            <section className='today-task-operations'>
                                {t.status !== 'Done' && <i className="fas fa-check-circle" onClick={_ => completeTaskCb(t.id)}></i>}
                            </section>
                        </li>
                    )       
                })}
            </ul>
        </React.Fragment>
    );
}
