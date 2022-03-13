import { refreshToken } from '../authentication';
import { updateTaskRequest }  from '../../repositories/task-repository';

const unknownErrorResponse = {
    success: false
};

const handleSuccessResponse = async _ => {
    return {
        success: true
    }
};

const handleUnauthorizedResponse = async (request, task) => {
    let response = await refreshToken();
    if (response.status !== 200) return { success: false, userNotLoggedIn: true }
    return await updateTask(task);
}

const handleInternalServerErrorResponse = async _ => unknownErrorResponse;

const responseHandlers = {
    401 : handleUnauthorizedResponse,
    200 : handleSuccessResponse,
    500 : handleInternalServerErrorResponse
}

export const updateTask = async (task) => {
    try {
        let request = await updateTaskRequest();
        let handleResponse = responseHandlers[request.status];
        return handleResponse ? await handleResponse(request, task) : unknownErrorResponse;
    } catch(ex) { return unknownErrorResponse; }
}