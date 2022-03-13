import React, {useState, useEffect} from 'react';
import { getTasks } from '../business-layer/tasks/get-tasks';
import { errorMessage } from '../utils/sweet-alert';
import '../styles/pages/task-list.css';
import UpsertTaskModal from '../components/modals/UpsertTaskModal';
import Navbar from '../components/common/Navbar'; 
import TaskTableWithPagination from '../components/tasks/TaskTableWithPagination';

export default function TaskList() {
    const EMPTY_TASK = {
        name: '',
        description: '',
        dateTime: new Date(),
        status: 'ToDo'
    }; 

    const [tasks, setTasks] = useState([]);
    const [tasksFiltered, setTasksFiltered] = useState([]);
    const [currentTask, setCurrentTask] = useState(EMPTY_TASK);
    const [isUpsertModalVisible, setUpsertModalVisibility] = useState(false);

    const openCreateTaskModal = () => {
        setUpsertModalVisibility(true);
        setCurrentTask(EMPTY_TASK);
    }

    const openUpdateTaskModal = (id) => {
        let task = tasks.find(t => t.id === id);

        if (task) {
            setUpsertModalVisibility(true);
            setCurrentTask(task)
        }
    }
   
    const filterByName = ({target:{value}}) => {
        if (!value) setTasksFiltered(tasks);
        setTasksFiltered(tasks.filter(t => t.name.toLowerCase().includes(value.toLowerCase())));
    }

    useEffect(() => setTasksFiltered(tasks), [tasks])

    useEffect(() => {
        getTasks().then(r => {
            if (r.userNotLoggedIn) window.location.href = '/Login';

            if (r.success) {
                setTasks(r.tasks);
                setTasksFiltered(r.tasks);
            } else {
                errorMessage("Error", "Something went wrong").then(_ => window.location.href = '/Login');
            } 
        });
    }, []);

    return (
        <main className="task-list">
            <Navbar />
            <section className="task-operations">
                <input className="search-input" type="text" placeholder="Search" onChange={e => filterByName(e)} />
                <input className="add-button" type="button" value="+" onClick={_ => openCreateTaskModal()}/>
            </section>
            <TaskTableWithPagination
                onTaskClick={openUpdateTaskModal}
                tasks={tasksFiltered}
                updateTasks={updatedTasks => setTasks(updatedTasks)}/>
            <UpsertTaskModal
                task={currentTask}
                isVisible={isUpsertModalVisible} 
                closeCallback={_ => setUpsertModalVisibility(false)}/>
        </main>
    );
}