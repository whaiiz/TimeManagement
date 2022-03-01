import React, {useEffect, useState} from 'react'
import Navbar from '../components/common/Navbar'
import TimerComponent from '../components/tasks/Timer'
import TodayTasksList from '../components/tasks/TodayTaskList'
import { getTasks} from '../business-layer/tasks';
import { getUserLoggedInToken } from  '../business-layer/authentication';
import '../styles/pages/today.css'
import AutoCompleteTaskInput from '../components/tasks/AutoCompleteTaskInput';

export default function Today() {
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [tasks, setTasks] = useState([]);

    const onTodayTaskClick = (id) => {

    }

    useEffect(() => {
        if (!getUserLoggedInToken()) window.location.href = '/Login';

        getTasks().then(r => {
            if(r.status === 200) {
                setTasks(r.tasks);
                setTodaysTasks(r.tasks);
            }
        });
    }, [setTodaysTasks])
    
    return(
        <React.Fragment>
            <Navbar />
            <section className='today-container'>
                <TimerComponent />
                <AutoCompleteTaskInput collection={tasks} onItemClick={onTodayTaskClick} addNewTaskCb={_ => {}}/>
                {/* <input className="add-today-task" type="text" placeholder="Add new task for today" /> */}
                <TodayTasksList todaysTasks={todaysTasks} className='timer' />
            </section>
        </React.Fragment>
    );
}
