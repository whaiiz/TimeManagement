import taskListReducer from './taskListReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    taskListReducer: taskListReducer
});

export default allReducers;