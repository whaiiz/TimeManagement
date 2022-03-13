import { refreshToken } from '../authentication'
import { deleteTaskRequest }  from '../../repositories/task-repository';

const unknownErrorResponse = {
    success: false
};

const handleUnauthorizedResponse = async (request, id) => {
    let refreshTokenResponse = await refreshToken();
    if (refreshTokenResponse.status !== 200) return { success: false, userNotLoggedIn: true }
    return await deleteTask(id);
}

const handleSuccessResponse = async _ => {
    return { success : true }
}

const handleInternalServerErrorResponse = async _ => unknownErrorResponse;

const responseHandlers = {
    200 : handleSuccessResponse,
    500 : handleInternalServerErrorResponse,
    401 : handleUnauthorizedResponse
}

export const deleteTask = async id => {
    try {
        let request = await deleteTaskRequest(id);
        let handleResponse = responseHandlers[request.status];
        return handleResponse ? await handleResponse(request, id) : unknownErrorResponse;
    } catch(ex) { return unknownErrorResponse; }
}