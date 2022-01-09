import React from 'react'
import '../styles/task-table.css';
import { dateTimeToDate } from '../utils/date-converter';

export default function TaskTable({tasks, onTaskClick}) {

    return ( tasks.length === 0 ? <h1>No results to show</h1> : 
        <table className="task-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(t => (
                    <tr key={`task-${t.id}`} onClick={_ => onTaskClick(t.id)}>
                        <td className="task-name">{t.name}</td>
                        <td className={`task-status ${t.status.toLowerCase()}-status`}>{t.status}</td>
                        <td className="task-date">{dateTimeToDate(t.dateTime)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
