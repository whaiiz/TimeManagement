const baseUrl = 'https://localhost:5001/api/User';

export const getUserRequest = (token) => {
    return fetch(baseUrl + '/GetUser', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};