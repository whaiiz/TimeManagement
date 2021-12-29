import React, {useState, useEffect} from 'react';
import Pagination from '../components/Pagination';
import TaskTable from '../components/TaskTable';
import { getTasks } from '../services/task-service';
import '../styles/task-list.css';
import UpsertTaskModal from '../components/modals/UpsertTaskModal';

export default function TaskList() {

    const TASKS_PER_PAGE = 5;
    const EMPTY_TASK = {
        name: '',
        description: '',
        dateTime: '',
        status: ''
    }; 

    let [tasks, setTasks] = useState([]);
    let [tasksFiltered, setTasksFiltered] = useState([]);
    let [pageTasks, setPageTasks] = useState([]);
    let [currentTask, setCurrentTask] = useState(EMPTY_TASK);
    let [isUpsertModalVisible, setUpsertModalVisibility] = useState(false);

    let paginate = (pageNumber) => {
        let indexOfLastTask = pageNumber * TASKS_PER_PAGE; 
        let indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;

        setPageTasks(tasksFiltered.slice(indexOfFirstTask, indexOfLastTask));
    }

    let openCreateTaskModal = () => {
        setUpsertModalVisibility(true);
        setCurrentTask(EMPTY_TASK);
    }

    let openUpdateTaskModal = (id) => {
        let task = tasks.find(t => t.id === id);

        if (task) {
            setUpsertModalVisibility(true);
            setCurrentTask(task)
        }
    }
   
    let filterByName = ({target:{value}}) => {
        if (!value) setTasksFiltered(tasks);
        setTasksFiltered(tasks.filter(t => t.name.toLowerCase().includes(value.toLowerCase())));
    }

    useEffect(() => paginate(1), [tasksFiltered])

    useEffect(() => {
        let init = async () => {
            let response = await getTasks();
            let result = await response.json();
            
            setTasks(result);
            setTasksFiltered(result);
        }
        init();
    }, []);

    return (
        <React.Fragment>
            <section className="task-operations">
                <input className="search-input" type="text" placeholder="Search" onChange={e => filterByName(e)} />
                <input className="add-button" type="button" value="+" onClick={_ => openCreateTaskModal()}/>
            </section>
            <TaskTable
                onTaskClick={openUpdateTaskModal}
                tasks={pageTasks}/>
            <Pagination 
                itemsPerPage={TASKS_PER_PAGE} 
                itemsCount={tasksFiltered.length}
                paginate={paginate}>
            </Pagination>
            <UpsertTaskModal
                task={currentTask}
                isVisible={isUpsertModalVisible} 
                closeCallback={_ => setUpsertModalVisibility(false)} />
        </React.Fragment>
    );
}