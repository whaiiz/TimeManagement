import React from 'react'
import '../styles/task-table.css';
import { dateTimeToDate } from '../utils/date-converter';
import { deleteDialog, successMessage, errorMessage } from '../services/sweet-alert-service';
import { deleteTask } from '../services/task-service';

export default function TaskTable({tasks, onTaskClick, updateTasks}) {

    const openDeleteTaskModal = (e, id) => {
        let task = tasks.find(t => t.id === id);
        deleteDialog(task.name).then(result => {
            if (result.isConfirmed) handleDeleteTask(id);
        });
        e.stopPropagation();
    }
    
    const handleDeleteTask = (id) => {
        deleteTask(id).then(_ => {
            successMessage("Success", "Task deleted!").then(_ => {
                updateTasks(tasks.filter(t => t.id !== id));
            });
        }).catch(_ => errorMessage('Error', 'Error deleting the task please try again!'));
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
                            {t.status === 'Active' && <i className="fas fa-check-circle" onClick={e => completeTask(e)}></i>}
                            {t.status !== 'ToDo' && <i className="fas fa-history" onClick={e => revertTaskStatus(e)}></i>}
                            <i className="fas fa-times-circle" onClick={e => openDeleteTaskModal(e, t.id)}></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
