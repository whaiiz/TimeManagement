import { getUserRequest, updateUserDefaultFocusTimeRequest, 
    updateUserDefaultBreakTimeRequest } from '../repositories/user-repository';

export const getUser = async _ => {
    try {
        let response = await getUserRequest();
        return await response.json(); 
    } catch(ex) { return null; }
}

export const updateUserDefaultBreakTime = async breakTime => {
    try {
        let response = await updateUserDefaultBreakTimeRequest(breakTime);
        return response.status === 200;
    } catch(ex) { return false; }
}

export const updateUserDefaultFocusTime = async focusTime => {
    try {
        let response = await updateUserDefaultFocusTimeRequest(focusTime);
        return response.status === 200;
    } catch(ex) { return false; }
}