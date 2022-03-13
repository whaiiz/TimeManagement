import config from '../config.json'

const { TASK_API } = config.APIS;

export const getTasksRequest = _ => {
    return fetch(TASK_API, {
        method: 'GET',
        credentials: 'include',
    });
}

export const createTaskRequest = task => {
    return fetch(TASK_API, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(task)
    });
}

export const updateTaskRequest = task => {
    return fetch(TASK_API, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(task)
    });
}

export const updateTaskDateRequest = (id, date) => {
    const args = `?id=${id}&date=${date}`;

    return fetch(TASK_API + `/UpdateDate${args}`, {
        method: 'PUT',
        credentials: 'include',
    });
}

export const updateTaskStatusRequest = (id, status) => {
    const args = `?id=${id}&status=${status}`;

    return fetch(TASK_API + `/UpdateStatus${args}`, {
        method: 'PUT',
        credentials: 'include',
    });
}

export const deleteTaskRequest = (id) => {
    return fetch(TASK_API + `/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
}