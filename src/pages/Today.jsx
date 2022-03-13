import React, {useEffect, useState} from 'react';
import Navbar from '../components/common/Navbar';
import TimerComponent from '../components/tasks/Timer';
import TodayTasksList from '../components/tasks/TodayTaskList';
import { getTasks } from '../business-layer/tasks/get-tasks';
import { updateTaskStatus } from '../business-layer/tasks/update-task-status';
import { updateTaskDate } from '../business-layer/tasks/update-task-date';
import { createTask } from '../business-layer/tasks/create-task';
import { isDateTimeToday } from '../utils/date-time-converter';
import '../styles/pages/today.css';
import AutoCompleteTaskInput from '../components/tasks/AutoCompleteTaskInput';
import { errorMessage } from '../utils/sweet-alert';

export default function Today() {
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [tasks, setTasks] = useState([]);

    const createNewTaskForToday = async name => {
        const response = await createTask({
            name: name,
            dateTime: new Date(),
            status: 'ToDo'
        });

        if (response.userNotLoggedIn) window.location.href = '/Login';

        if (response.success) fetchTasks();
        else errorMessage("Error", "Something went wrong").then(_ => window.location.href = '/Login');
    }

    const addExistingTaskForToday = async id => {
        const task = tasks.find(t => t.id === id);

        if (!task) return;

        updateTaskDate(id, new Date().toISOString()).then(r => {
            
            if (r.userNotLoggedIn) window.location.href = '/Login';

            if (r.success) fetchTasks();
            else errorMessage("Error", "Something went wrong").then(_ => window.location.href = '/Login');
        });
    }

    const completeTodayTask = async id => {
        const task = tasks.find(t => t.id === id);

        if (!task) return;

        const response = await updateTaskStatus(id, 'Done');

        if (response.userNotLoggedIn) window.location.href = '/Login';

        if (response.success) fetchTasks();
        else errorMessage("Error", "Something went wrong").then(_ => window.location.href = '/Login');
    }

    const fetchTasks = _ => {
        getTasks().then(r => {
            if (r.userNotLoggedIn) window.location.href = '/Login';

            if (r.success) {
                setTasks(r.tasks.filter(t => !isDateTimeToday(t.dateTime)));
                setTodaysTasks(r.tasks.filter(t => isDateTimeToday(t.dateTime)));
            } else {
                errorMessage("Error", "Something went wrong").then(_ => window.location.href = '/Login');
            } 
        });
    }

    useEffect(() => {
        fetchTasks();
    }, [])
    
    return(
        <React.Fragment>
            <Navbar />
            <section className='today-container'>
                <TimerComponent />
                <AutoCompleteTaskInput 
                    collection={tasks} 
                    onItemClick={addExistingTaskForToday} 
                    addNewTaskCb={createNewTaskForToday}/>
                <TodayTasksList 
                    tasks={todaysTasks} 
                    completeTaskCb={completeTodayTask} />
            </section>
        </React.Fragment>
    );
}
