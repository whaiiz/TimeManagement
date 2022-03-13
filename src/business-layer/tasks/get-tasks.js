import { refreshToken } from '../authentication'
import { getTasksRequest }  from '../../repositories/task-repository';

const handleUnauthorizedResponse = async () => {
    let response = await refreshToken();
    if (response.status !== 200) return { success: false, userNotLoggedIn: true }
    return await getTasks();
}

const handleSuccessResponse = async request => {
    let response = await request.json();
    return { success: true, tasks: response }
}

const handleInternalServerErrorResponse = async _ => unknownErrorResponse;

const unknownErrorResponse = {
    success: false, 
    tasks: []
}

const responseHandlers = {
    401 : handleUnauthorizedResponse,
    200 : handleSuccessResponse,
    500 : handleInternalServerErrorResponse
}

export const getTasks = async _ => {
    try {
        let request = await getTasksRequest();
        let handleResponse = responseHandlers[request.status];
        return handleResponse ? await handleResponse(request) : unknownErrorResponse;
    } catch(ex) { return unknownErrorResponse; }
}