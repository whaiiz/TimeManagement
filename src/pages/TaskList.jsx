import React, {useState, useEffect} from 'react';
import Pagination from '../components/Pagination';
import TaskTable from '../components/TaskTable';
import { getTasks } from '../services/task-service';
import '../styles/task-list.css';
import { Link } from 'react-router-dom';
import UpsertTaskModal from '../components/modals/upsert-task/UpsertTaskModal';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [tasksPerPage] = useState(5);
    const [currentTasks, setCurrentTasks] = useState([]);

    const filterByName = ({target : {value}}) => {
        setCurrentTasks(tasks.filter(t => t.name.includes(value)));
    }

    const paginate = (pageNumber) => {
        const indexOfLastTask = pageNumber - tasksPerPage; 
        const indexOfFirstTask = indexOfLastTask - tasksPerPage;

        setCurrentTasks(tasks.slice(indexOfFirstTask, indexOfLastTask));
    };
    
    useEffect(() => {
        const init = async () => {
            const response = await getTasks();
            const tasks = await response.json();
            const indexOfLastTask = 1 - tasksPerPage; 
            const indexOfFirstTask = indexOfLastTask - tasksPerPage;

            setTasks(tasks);
            setCurrentTasks(tasks.slice(indexOfFirstTask, indexOfLastTask));
        }
        init();
    }, []);

    return (
        <React.Fragment>
            <section className="task-operations">
                <input className="search-input" type="text" placeholder="Search" onChange={(e) => filterByName(e)} />
                <Link to="/UpsertTask" className="add-button">+</Link>
            </section>
            <TaskTable tasks={currentTasks}></TaskTable>
            <Pagination 
                itemsPerPage={tasksPerPage} 
                itemsCount={tasks.length}
                paginate={paginate}>
            </Pagination>
            <UpsertTaskModal />
        </React.Fragment>
    );
}
