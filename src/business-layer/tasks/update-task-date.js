import { refreshToken } from '../authentication';
import { updateTaskDateRequest }  from '../../repositories/task-repository';

const unknownErrorResponse = {
    success: false
};

const handleSuccessResponse = async _ => {
    return {
        success: true
    }
};

const handleUnauthorizedResponse = async (request, id, date) => {
    let response = await refreshToken();
    if (response.status !== 200) return { success: false, userNotLoggedIn: true }
    return await updateTaskDate(id, date);
}

const handleInternalServerErrorResponse = async _ => unknownErrorResponse;

const responseHandlers = {
    401 : handleUnauthorizedResponse,
    200 : handleSuccessResponse,
    500 : handleInternalServerErrorResponse
}

export const updateTaskDate = async (id, date) => {
    try {
        let request = await updateTaskDateRequest(id, date);
        let handleResponse = responseHandlers[request.status];
        return handleResponse ? await handleResponse(request, id, date) : unknownErrorResponse;
    } catch(ex) { return unknownErrorResponse; }
}