import { getUserRequest } from '../repositories/user-repository';
import { getUserLoggedInToken } from '../business-layer/authentication';

export const getUser = async () => {
    try {
        let response = await getUserRequest(getUserLoggedInToken());
        return await response.json(); 
    } catch(ex) { return null; }
}
