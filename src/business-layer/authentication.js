import { loginRequest, registerRequest } from '../repositories/authentication-repository';

export const login = async (username, password) => {
    let request = await loginRequest(username, password);
    let response = await request.json();
    let result = { isLoggedIn: false, message: response }

    if (request.status === 200) {
        localStorage.setItem("key", response);
        result.isLoggedIn = true;
        result.message = "You are logged in";
    }

    return response;
}

export const register = async (user) => {
    let request = await registerRequest(user);
    let response = await request.json();

    return request.status !== 200 ? { success: false, message: response}: 
        { success: true, message: 'User registered, please confirm your email'} 
}

export const isUserLoggedIn = _ => true;