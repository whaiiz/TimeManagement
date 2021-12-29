import React from 'react'
import '../styles/task-table.css';

export default function TaskTable({tasks, onTaskClick}) {

    let getDate = date => {
        let dateObj = new Date(date);
        let day = dateObj.getDay(); 
        let month = dateObj.getMonth();

        return `${dateObj.getUTCFullYear()}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day}`;
    } 

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
                        <td className="task-date">{getDate(t.dateTime)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
