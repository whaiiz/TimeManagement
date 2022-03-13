import { refreshToken } from '../authentication'
import { createTaskRequest }  from '../../repositories/task-repository';

const unknownErrorResponse = {
    success: false, 
    task: {}
}

const handleUnauthorizedResponse = async () => {
    let refreshTokenResponse = await refreshToken();
    if (refreshTokenResponse.status !== 200) return { success: false, userNotLoggedIn: true }
    return await createTask();
}

const handleSuccessResponse = async request => {
    let result = { success: false, task: {}}
    let response = await request.json();

    result.success = true;
    result.task = response;
    return result;
}

const handleInternalServerErrorResponse = async _ => unknownErrorResponse;

const responseHandlers = {
    401 : handleUnauthorizedResponse,
    200 : handleSuccessResponse,
    500 : handleInternalServerErrorResponse
}

export const createTask = async task => {
    try {
        let request = await createTaskRequest(task);
        let handleResponse = responseHandlers[request.status];
        return handleResponse ? await handleResponse(request) : unknownErrorResponse;
    } catch(ex) {
        return unknownErrorResponse;
    }
}