import { getTasksRequest, createTaskRequest, updateTaskRequest, updateTaskDateRequest, 
    updateTaskStatusRequest, deleteTaskRequest}  from '../../repositories/authentication-repository';

export const getTasks = async _ => {
    let request = await getTasksRequest();
    let result = { success: false, tasks: [] };

    if (request.status === 200) {
        let response = await request.json();
        result.success = true;
        result.tasks = response;
    }
    
    return result;
}

export const createTask = async task => {
    let request = await createTaskRequest(task);
    return request.status === 200 ? true : false;
}

export const updateTask = async task => {
    let request = await updateTaskRequest(task);
    return request.status === 200 ? true : false;
}

export const updateTaskDate = async (id, date) => {
    let request = await updateTaskDateRequest(id, date);
    return request.status === 200 ? true : false;
}

export const updateTaskStatus = async (id, status) => {
    let request = await updateTaskStatusRequest(id, status);
    return request.status === 200 ? true : false;
}

export const deleteTask = async (id) => {
    let request = await deleteTaskRequest(id);
    return request.status === 200 ? true : false;
}