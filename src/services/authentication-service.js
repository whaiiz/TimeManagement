const baseUrl = 'https://localhost:5001/api';

export const handleLoginRequest = (username, password) => {
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

export const handleRegisterRequest = (user) => {
    return fetch(baseUrl + '/Authentication/Register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}