import React, {useEffect, useState} from 'react'
import Navbar from '../components/common/Navbar'
import TimerComponent from '../components/tasks/Timer'
import TodayTasksList from '../components/tasks/TodayTaskList'
import { getTasks} from '../business-layer/tasks';
import { createTask, updateTaskStatus, updateTaskDate } from '../business-layer/tasks';
import { isDateTimeToday } from '../utils/date-time-converter';
import '../styles/pages/today.css'
import AutoCompleteTaskInput from '../components/tasks/AutoCompleteTaskInput';

export default function Today() {
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [tasks, setTasks] = useState([]);

    const createNewTaskForToday = async name => {
        const result = await createTask({
            name: name,
            dateTime: new Date(),
            status: 'ToDo'
        });

        if (result.success) fetchTasks();
    }

    const addExistingTaskForToday = id => {
        const task = tasks.find(t => t.id === id);
        if (task) updateTaskDate(id, new Date().toISOString()).then(_ => fetchTasks());
    }

    const completeTodayTask = async id => {
        const success = await updateTaskStatus(id, 'Done');
        if (success) fetchTasks();
    }

    const fetchTasks = _ => {
        getTasks().then(r => {
            if(r.status === 200) {
                setTasks(r.tasks.filter(t => !isDateTimeToday(t.dateTime)));
                setTodaysTasks(r.tasks.filter(t => isDateTimeToday(t.dateTime)));
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
