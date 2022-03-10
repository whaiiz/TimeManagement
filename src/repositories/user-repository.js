const baseUrl = 'https://localhost:5001/api/User';

export const getUserRequest = () => {
    return fetch(baseUrl + '/GetUser', {
        method: 'GET',
        credentials: 'include',
    });
};

export const updateUserDefaultBreakTimeRequest = (breakTime) => {
    return fetch(baseUrl + '/UpdateUserDefaultBreakTime?breakTime=' + breakTime, {
        method: 'PUT',
        credentials: 'include',
    });
};

export const updateUserDefaultFocusTimeRequest = (focusTime) => {
    return fetch(baseUrl + '/UpdateUserDefaultFocusTime?focusTime=' + focusTime , {
        method: 'PUT',
        credentials: 'include',
    });
};