import { refreshToken } from '../authentication';
import { updateUserDefaultBreakTimeRequest }  from '../../repositories/user-repository';

const unknownErrorResponse = {
    success: false
};

const handleSuccessResponse = async _ => {
    return {
        success: true
    }
};

const handleUnauthorizedResponse = async (request, breakTime) => {
    let response = await refreshToken();
    if (response.status !== 200) return { success: false, userNotLoggedIn: true }
    return await updateUserDefaultBreakTime(breakTime);
}

const handleInternalServerErrorResponse = async _ => unknownErrorResponse;

const responseHandlers = {
    401 : handleUnauthorizedResponse,
    200 : handleSuccessResponse,
    500 : handleInternalServerErrorResponse
}

export const updateUserDefaultBreakTime = async (breakTime) => {
    try {
        let request = await updateUserDefaultBreakTimeRequest(breakTime);
        let handleResponse = responseHandlers[request.status];
        return handleResponse ? await handleResponse(request, breakTime) : unknownErrorResponse;
    } catch(ex) { return unknownErrorResponse; }
}