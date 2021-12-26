import React from 'react'
import '../../../styles/modals/upsert-task/upsert-task-modal-body.css'

export default function UpsertTaskModalBody() {
    return (
        <form className="upsert-task-form">
            <article className="task-name-container">
                <label htmlFor="task-name">Name</label>
                <input type="text" id="task-name" className="task-name"/>
            </article>
            <article className="task-status-container">
                <label htmlFor="task-status">Status</label>
                <select id="task-status">
                    <option>ToDo</option>
                    <option>Active</option>
                    <option>Done</option>
                </select>
            </article>
            <article className="task-description-container">
                <label htmlFor="task-description">Description</label>
                <textarea id="task-description" className="task-description" cols="30" rows="5"></textarea>
            </article>
        </form>
    )
}
