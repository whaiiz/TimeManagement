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
    } catch(ex){
        return { success: false, message: 'Unexpected error! Try again later'}
    }
}

export const forgotPassword = async email => {
    let request = await forgotPasswordRequest(email);
    let response = await request.text();

    return request.status !== 200 ? { success: false, message: response}: 
        { success: true, message: `Email sent for ${email} to reset your password`};
}

export const resetPassword = async (newPassword, token) => {
    let request = await resetPasswordRequest(newPassword, token);
    let response = await request.json();

    return request.status !== 200 ? { success: false, message: response}: 
        { success: true, message: `Password changed`} 
}

// TO DO : Change to http only cookie
export const getUserLoggedInToken = _ => localStorage.getItem("auth-token");

export const logout = _ => localStorage.removeItem("auth-token");