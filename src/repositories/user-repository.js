import { getUserLoggedInToken } from "../business-layer/authentication";

const baseUrl = 'https://localhost:5001/api/User';

export const getUserRequest = () => {
    return fetch(baseUrl + '/GetUser', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getUserLoggedInToken()}`
        },
    });
};

export const updateUserDefaultBreakTimeRequest = (breakTime) => {
    return fetch(baseUrl + '/UpdateUserDefaultBreakTime?breakTime=' + breakTime, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getUserLoggedInToken()}`
        },
    });
};

export const updateUserDefaultFocusTimeRequest = (focusTime) => {
    return fetch(baseUrl + '/UpdateUserDefaultFocusTime?focusTime=' + focusTime , {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getUserLoggedInToken()}`
        },
    });
};