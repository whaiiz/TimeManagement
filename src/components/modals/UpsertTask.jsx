import React from 'react';
import '../../styles/upsert-task.css';

export default function UpsertTask() {
    return (
        <React.Fragment>
            <h1>Adicionar tarefa</h1>
            <form action="">
                <article>
                    <label htmlFor="task-name">Name</label>
                    <input type="text" id="task-name" />
                </article>
                <article>
                    <label htmlFor="task-description">Description</label>
                    <textarea id="task-description" cols="30" rows="10"></textarea>
                </article>
                <article>
                    <label htmlFor="task-status"></label>
                    <select id="task-status">
                        <option>ToDo</option>
                        <option>Active</option>
                        <option>Done</option>
                    </select>
                </article>
                <article></article>
            </form>
        </React.Fragment>
    );
}
