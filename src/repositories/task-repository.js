const baseUrl = 'https://localhost:5001/api';

export const getTasksRequest = _ => {
    return fetch(`${baseUrl}/Task`);
}

export const createTaskRequest = task => {
    return fetch(baseUrl + '/Task', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}

export const updateTaskRequest = task => {
    return fetch(baseUrl + '/Task', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}

export const updateTaskDateRequest = (id, date) => {
    const args = `?id=${id}&date=${date}`;

    return fetch(baseUrl + `/Task/UpdateDate${args}`, {
        method: 'PUT',
    });
}

export const updateTaskStatusRequest = (id, status) => {
    const args = `?id=${id}&status=${status}`;

    return fetch(baseUrl + `/Task/UpdateStatus${args}`, {
        method: 'PUT',
    });
}

export const deleteTaskRequest = (id) => {
    return fetch(baseUrl + `/Task/${id}`, {
        method: 'DELETE',
    });
}