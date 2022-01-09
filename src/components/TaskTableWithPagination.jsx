import React, {useState, useEffect} from 'react';
import Pagination from '../components/Pagination';
import TaskTable from '../components/TaskTable';

export default function TaskTableWithPagination({tasks, onTaskClick}) {
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
                tasks={pageTasks}/>
            <Pagination 
                itemsPerPage={TASKS_PER_PAGE} 
                itemsCount={tasks.length}
                paginate={paginate}/>
        </React.Fragment>
    );
}