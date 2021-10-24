import React from 'react'

import '../styles/task-table.css';

export default function TaskTable({tasks}) {
    return (
        <table className="task-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(w => (
                    <tr key={`task-${w.displayId}`}>
                        <td className="task-name">{w.name}</td>
                        <td className={`task-status ${w.status.toLowerCase()}-status`}>{w.status}</td>
                        <td className="task-date">{w.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
