const baseUrl = 'https://localhost:5001/api';

export const loginRequest = (username, password) => {
    let user = {
        username, password
    }
    return fetch(baseUrl + '/Authentication/Login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export const registerRequest = (user) => {
    return fetch(baseUrl + '/Authentication/Register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export const forgotPasswordRequest = email => {
    return fetch(baseUrl + `/Authentication/ForgotPassword?email=${email}`, {
        method: 'POST',
    });
}

export const resetPasswordRequest = (newPassword, token) => {
    return fetch(baseUrl + '/Authentication/ResetPassword', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: newPassword
    });
};