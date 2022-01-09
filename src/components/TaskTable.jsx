import React from 'react'
import '../styles/task-table.css';
import { dateTimeToDate } from '../utils/date-converter';

export default function TaskTable({tasks, onTaskClick, deleteCb}) {

    const deleteTask = (e, id) => {
        console.log('delete');
        e.stopPropagation();
    }
    
    const revertTaskStatus = (e, id) => {
        console.log('revert');
        e.stopPropagation();
    }

    const completeTask = (e, id) => {
        console.log('complete');
        e.stopPropagation();
    }

    return ( tasks.length === 0 ? <h1>No results to show</h1> : 
        <table className="task-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(t => (
                    <tr key={`task-${t.id}`} onClick={_ => onTaskClick(t.id)}>
                        <td className="task-name">{t.name}</td>
                        <td className={`task-status ${t.status.toLowerCase()}-status`}>{t.status}</td>
                        <td className="task-date">{dateTimeToDate(t.dateTime)}</td>
                        <td className="task-actions">
                            <i className="fas fa-check-circle" onClick={e => completeTask(e)}></i>
                            <i className="fas fa-history" onClick={e => revertTaskStatus(e)}></i>
                            <i className="fas fa-times-circle" onClick={e => deleteTask(e)}></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
