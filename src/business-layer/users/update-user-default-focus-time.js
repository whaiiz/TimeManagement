import { refreshToken } from '../authentication';
import { updateUserDefaultFocusTimeRequest }  from '../../repositories/user-repository';

const unknownErrorResponse = {
    success: false
};

const handleSuccessResponse = async _ => {
    return {
        success: true
    }
};

const handleUnauthorizedResponse = async (request, focusTime) => {
    let response = await refreshToken();
    if (response.status !== 200) return { success: false, userNotLoggedIn: true }
    return await updateUserDefaultFocusTime(focusTime);
}

const handleInternalServerErrorResponse = async _ => unknownErrorResponse;

const responseHandlers = {
    401 : handleUnauthorizedResponse,
    200 : handleSuccessResponse,
    500 : handleInternalServerErrorResponse
}

export const updateUserDefaultFocusTime = async (focusTime) => {
    try {
        let request = await updateUserDefaultFocusTimeRequest();
        let handleResponse = responseHandlers[request.status];
        return handleResponse ? await handleResponse(request, focusTime) : unknownErrorResponse;
    } catch(ex) { return unknownErrorResponse; }
}