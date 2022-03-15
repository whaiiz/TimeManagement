import React, {useState, useEffect} from 'react';
import { updateTaskDate } from '../business-layer/tasks/update-task-date';
import { getTasks } from '../business-layer/tasks/get-tasks';
import { errorMessage } from '../utils/sweet-alert';
import TaskTableWithPagination from '../components/tasks/TaskTableWithPagination';
import AutoCompleteInput from '../components/common/AutoCompleteInput';
import Navbar from '../components/common/Navbar'; 
import { dateTimeToDate } from '../utils/date-time-converter';
import '../styles/pages/planning.css';

export default function Planning() {
    const [tasks, setTasks] = useState([]);
    const [planningDate, setPlanningDate] = useState(dateTimeToDate(new Date()));
    const [planningTasks, setPlanningTasks] = useState([]);

    const handleUpdateTaskDate = async (id, date) => {
        let response = await updateTaskDate(id, date)

        if (response.userNotLoggedIn) window.location.href = '/Login';

        if (response.success) {
            let tasksCopy = [...tasks];
            let updatedTask = tasksCopy.find(t => t.id === id);

            updatedTask.dateTime = date;
            tasksCopy = tasksCopy.map(t => t.id !== id ? t : updatedTask);
            setTasks(tasksCopy);
        } else {
            errorMessage("Error", "Something went wrong").then(_ => window.location.href = '/Login');
        }
    }

    useEffect(() => {
        getTasks().then(r => {
            if (r.userNotLoggedIn) window.location.href = '/Login';
            if (r.success) setTasks(r.tasks);
            else errorMessage("Error", "Something went wrong").then(_ => window.location.href = '/Login');
        })
    }, []);

    useEffect(() => {
        setPlanningTasks(tasks.filter(t => dateTimeToDate(t.dateTime) === planningDate));
    }, [planningDate, tasks])

    return (
        <main className="task-planning">
            <Navbar />
            <section className="task-plan">
                <article className='name-container'>
                    <AutoCompleteInput
                        collection={tasks.filter(t => dateTimeToDate(t.dateTime) !== planningDate)} 
                        onItemClick={id => handleUpdateTaskDate(id, planningDate)}
                        placeholder = "Search Task"
                        classes="name-input"/>
                </article>
                <article className="date-container">
                    <input type="date" className='date-input'
                        value={planningDate} onChange={e => setPlanningDate(e.target.value)}/>
                </article>
            </section>
            <TaskTableWithPagination 
                tasks={planningTasks}
                updateTasks={updatedTasks => setTasks(updatedTasks)}
                onTaskClick={_ => {}} />
        </main>
    );
}