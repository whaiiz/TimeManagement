import React from 'react'
import '../../styles/components/tasks/task-table.css';
import { dateTimeToDate } from '../../utils/date-time-converter';
import { deleteDialog, successMessage, errorMessage } from '../../utils/sweet-alert';
import { deleteTask, updateTaskStatus } from '../../business-layer/tasks.js';

export default function TaskTable({tasks, onTaskClick, updateTasks}) {

    const openDeleteTaskModal = (e, id) => {
        let task = tasks.find(t => t.id === id);
        deleteDialog(task.name).then(result => {
            if (result.isConfirmed) handleDeleteTask(id);
        });
        e.stopPropagation();
    }
    
    const handleDeleteTask = async (id) => {
        if (await deleteTask(id)) {
            successMessage("Success", "Task deleted!").then(_ => updateTasks(tasks.filter(t => t.id !== id)));
            return;
        }

        errorMessage('Error', 'Error deleting the task please try again!');
    }

    const handleUpdateStatus = async (id, status) => {
        let updatedTask = tasks.find(t => t.id === id);
        updatedTask.status = status;

        updateTaskStatus(id, status).then(success => {
            if (success) updateTasks(tasks.map(t => t.id !== id ? t : updatedTask));
            else errorMessage('Error', 'Error updating task please try again!');
        })
    }

    const revertTaskStatus = (e, id) => {
        let updatedTask = tasks.find(t => t.id === id);
        handleUpdateStatus(id, updatedTask.status === 'Done' ? 'Active' : 'ToDo')
        e.stopPropagation();
    }

    const completeTask = (e, id) => {
        handleUpdateStatus(id, 'Done');
        e.stopPropagation();
    }

    const startTask = (e, id) => {
        handleUpdateStatus(id, 'Active');
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
                            {t.status === 'ToDo' && <i className="fas fa-play-circle" onClick={e => startTask(e, t.id)}></i>}
                            {t.status === 'Active' && <i className="fas fa-check-circle" onClick={e => completeTask(e, t.id)}></i>}
                            {t.status !== 'ToDo' && <i className="fas fa-history" onClick={e => revertTaskStatus(e, t.id)}></i>}
                            <i className="fas fa-times-circle" onClick={e => openDeleteTaskModal(e, t.id)}></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
