import { loginRequest, registerRequest,  forgotPasswordRequest, resetPasswordRequest } from '../repositories/authentication-repository';

const getLoginResponse = (request, requestResponse) => {
    let result = { isLoggedIn: false, message: requestResponse }

    if (request.status === 200) {
        localStorage.setItem("auth-token", requestResponse);
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

// TO DO : Change to http only cookie
export const getUserLoggedInToken = _ => localStorage.getItem("auth-token");

export const logout = _ => localStorage.removeItem("auth-token");