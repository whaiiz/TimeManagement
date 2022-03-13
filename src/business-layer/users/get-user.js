import { refreshToken } from '../authentication'
import { getUserRequest }  from '../../repositories/user-repository';

const unknownErrorResponse = {
    success: false, 
    user: {}
}

const handleUnauthorizedResponse = async _ => {
    let refreshTokenResponse = await refreshToken();
    if (refreshTokenResponse.status !== 200) return { success: false, userNotLoggedIn: true }
    return await getUser();
}

const handleSuccessResponse = async request => {
    let result = { success: false, user: {}}
    let response = await request.json();

    result.success = true;
    result.user = response;
    return result;
}

const handleInternalServerErrorResponse = async _ => unknownErrorResponse;

const responseHandlers = {
    401 : handleUnauthorizedResponse,
    200 : handleSuccessResponse,
    500 : handleInternalServerErrorResponse
}

export const getUser = async _ => {
    try {
        let request = await getUserRequest();
        let handleResponse = responseHandlers[request.status];
        return handleResponse ? await handleResponse(request) : unknownErrorResponse;
    } catch(ex) { return unknownErrorResponse; }
}