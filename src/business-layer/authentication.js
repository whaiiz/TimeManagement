import { loginRequest, registerRequest,  forgotPasswordRequest, resetPasswordRequest } from '../repositories/authentication-repository';

export const login = async (username, password) => {
    let request = await loginRequest(username, password);
    let response = await request.json();
    let result = { isLoggedIn: false, message: response }

    if (request.status === 200) {
        localStorage.setItem("auth-token", response);
        result.isLoggedIn = true;
        result.message = "You are logged in";
    }

    return result;
}

export const register = async (user) => {
    let request = await registerRequest(user);
    let response = await request.json();

    return request.status !== 200 ? { success: false, message: response}: 
        { success: true, message: 'User registered, please confirm your email'} 
}

export const forgotPassword = async email => {
    let request = await forgotPasswordRequest(email);
    console.log(request);
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