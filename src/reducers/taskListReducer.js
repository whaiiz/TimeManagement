const taskListReducer = (state = 0, action) => {
    switch(action.type) {
        case 'SEARCH': return state + action.payload;
        case 'PAGINATE': return state - 1;
        case 'OPEN_UPSERT_MODAL': return state - 1;
        default: return 0;
    }
}

export default taskListReducer;