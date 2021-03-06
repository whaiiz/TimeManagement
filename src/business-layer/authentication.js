import { loginRequest, registerRequest, forgotPasswordRequest, 
    resetPasswordRequest, refreshTokenRequest, logoutRequest } from '../repositories/authentication-repository';

const getLoginResponse = (request, requestResponse) => {
    let result = { isLoggedIn: false, message: requestResponse }

    if (request.status === 200) {
        result.isLoggedIn = true;
        result.message = "Login success";
    }

    return result;
}

export const login = async (username, password) => {
    try {
        let request = await loginRequest(username, password);
        return getLoginResponse(request, await request.json());
    } catch (ex) {
        return { isLoggedIn: false, message: 'Unexpected error! Try again later'};
    }
}

const getRegisterResponse = (request, requestResponse) => {
    return request.status !== 200 ? { success: false, message: requestResponse }: 
        { success: true, message: 'User registered, please confirm your email'} 
}

export const register = async (user) => {
    try {
        let request = await registerRequest(user);
        return getRegisterResponse(request, await request.json());
    } catch(ex) {
        return { success: false, message: 'Unexpected error! Try again later'}
    }
}

const getForgotPasswordResponse = (request, requestResponse, email) => {
    return request.status !== 200 ? { success: false, message: requestResponse}: 
        { success: true, message: `Email sent for ${email} to reset your password`};
}

export const forgotPassword = async email => {
    try {
        let request = await forgotPasswordRequest(email);
        return getForgotPasswordResponse(request, await request.json(), email);
    } catch(ex) {
        return { success: false, message: 'Unexpected error! Try again later'}
    }
}

const getResetPasswordResponse = (request, requestResponse) => {
    return request.status !== 200 ? { success: false, message: requestResponse}: 
        { success: true, message: `Password changed`} 
}

export const resetPassword = async (newPassword, token) => {
    try {
        let request = await resetPasswordRequest(newPassword, token);
        return getResetPasswordResponse(request, await request.json());
    } catch (ex) {
        return { success: false, message: 'Unexpected error! Try again later'}
    }
}

export const refreshToken = async () => {
    try {
        let request = await refreshTokenRequest();
        return await request.json();
    } catch(ex) {
        return { success: false, message: 'Unexpected error! Try again later'}
    }
}

export const logout = async _ => {
    try {
        let response = await logoutRequest();
        return response.status === 200 ? true : false;
    } catch(ex) { return false; }
} 