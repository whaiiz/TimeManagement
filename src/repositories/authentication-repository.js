import config from '../config.json'

const { AUTHENTICATION_API } = config.APIS;

export const loginRequest = (username, password) => {
    let user = {
        username, password
    }
    return fetch(AUTHENTICATION_API + '/Login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    });
}

export const registerRequest = (user) => {
    return fetch(AUTHENTICATION_API + '/Register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export const forgotPasswordRequest = email => {
    return fetch(AUTHENTICATION_API + `/ForgotPassword?email=${email}`, {
        method: 'POST',
    });
}

export const resetPasswordRequest = (newPassword, token) => {
    return fetch(AUTHENTICATION_API + '/ResetPassword', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newPassword)
    });
};

export const refreshTokenRequest = () => {
    return fetch(AUTHENTICATION_API + '/RefreshToken', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
};