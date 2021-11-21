import React from 'react'

export default function UpsertTaskModalBody() {
    return (
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
                <label htmlFor="task-status">Status</label>
                <select id="task-status">
                    <option>ToDo</option>
                    <option>Active</option>
                    <option>Done</option>
                </select>
            </article>
            <article>
                <button type="submit">Criar</button>
            </article>
        </form>
    )
}
