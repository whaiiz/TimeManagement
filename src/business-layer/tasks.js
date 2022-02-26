import { getTasksRequest, createTaskRequest, updateTaskRequest, updateTaskDateRequest, 
    updateTaskStatusRequest, deleteTaskRequest}  from '../repositories/task-repository';

let getGetTasksResponse = async (request) => {
    let result = { success: false, tasks: [], status: request.status };

    if (request.status === 200) {
        let response = await request.json();
        result.success = true;
        result.tasks = response;
    }
    
    return result;
}

export const getTasks = async _ => {
    try {
        let request = await getTasksRequest();
        return await getGetTasksResponse(request);
    } catch(ex) {
        return { success: false, tasks: []}
    }
}

export const createTask = async task => {
    try {
        let request = await createTaskRequest(task);
        return request.status === 200 ? true : false;
    } catch(ex) { return false; }
}

export const updateTask = async task => {
    try {
        let request = await updateTaskRequest(task);
        return request.status === 200 ? true : false;
    } catch(ex) { return false; }
}

export const updateTaskDate = async (id, date) => {
    try {
        let request = await updateTaskDateRequest(id, date);
        return request.status === 200 ? true : false;
    } catch(ex) { return false; }
}

export const updateTaskStatus = async (id, status) => {
    try {
        let request = await updateTaskStatusRequest(id, status);
        return request.status === 200 ? true : false;
    } catch(ex) { return false; }
}

export const deleteTask = async (id) => {
    try {
        let request = await deleteTaskRequest(id);
        return request.status === 200 ? true : false;
    } catch(ex) { return false; }
}