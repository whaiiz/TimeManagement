import { handleLoginRequest, handleRegisterRequest } from '../../repositories/authentication-repository';

export const login = async (username, password) => {
    let request = await handleLoginRequest(username, password);
    let response = await request.json();

    if (request.status === 200) {
        localStorage.setItem("key", response);
        return {
            isLoggedIn: true,
            message: "You are logged in"
        };
    }

    return {
        isLoggedIn: false,
        message: response
    };
}

export const register = async (user) => {
    let request = await handleRegisterRequest(user);
    let response = await request.json();

    return request.status !== 200 ? { success: false, message: response}: 
        { success: true, message: 'User registered, please confirm your email'} 
}