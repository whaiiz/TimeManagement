import React, {useState, useEffect} from 'react';
import Pagination from '../../components/common/Pagination';
import TaskTable from '../../components/tasks/TaskTable';

export default function TaskTableWithPagination({tasks, onTaskClick, updateTasks}) {
    const TASKS_PER_PAGE = 5;
    const [pageTasks, setPageTasks] = useState([]);
    
    const paginate = (pageNumber) => {
        const indexOfLastTask = pageNumber * TASKS_PER_PAGE; 
        const indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;

        setPageTasks(tasks.slice(indexOfFirstTask, indexOfLastTask));
    }
    
    useEffect(() => {
        setPageTasks(tasks);
        paginate(1);
    } , [tasks]);

    return (
        <React.Fragment>
            <TaskTable
                onTaskClick={onTaskClick}
                tasks={pageTasks}
                updateTasks={updateTasks} />
            <Pagination 
                itemsPerPage={TASKS_PER_PAGE} 
                itemsCount={tasks.length}
                paginate={paginate}/>
        </React.Fragment>
    );
}