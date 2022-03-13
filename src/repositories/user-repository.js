import config from '../config.json'

const { USER_API } = config.APIS;

export const getUserRequest = () => {
    return fetch(USER_API + '/GetUser', {
        method: 'GET',
        credentials: 'include',
    });
};

export const updateUserDefaultBreakTimeRequest = (breakTime) => {
    return fetch(USER_API + '/UpdateUserDefaultBreakTime?breakTime=' + breakTime, {
        method: 'PUT',
        credentials: 'include',
    });
};

export const updateUserDefaultFocusTimeRequest = (focusTime) => {
    return fetch(USER_API + '/UpdateUserDefaultFocusTime?focusTime=' + focusTime , {
        method: 'PUT',
        credentials: 'include',
    });
};