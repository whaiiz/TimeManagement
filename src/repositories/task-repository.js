const baseUrl = 'https://localhost:5001/api';

export const getTasks = _ => {
    return fetch(`${baseUrl}/Task`);
}

export const createTask = task => {
    return fetch(baseUrl + '/Task', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}

export const updateTask = task => {
    return fetch(baseUrl + '/Task', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}

export const updateDate = (id, date) => {
    const args = `?id=${id}&date=${date}`;

    return fetch(baseUrl + `/Task/UpdateDate${args}`, {
        method: 'PUT',
    });
}

export const updateStatus = (id, status) => {
    const args = `?id=${id}&status=${status}`;

    return fetch(baseUrl + `/Task/UpdateStatus${args}`, {
        method: 'PUT',
    });
}

export const deleteTask = (id) => {
    return fetch(baseUrl + `/Task/${id}`, {
        method: 'DELETE',
    });
}