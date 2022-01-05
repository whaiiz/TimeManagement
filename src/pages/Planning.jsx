import React, {useState, useEffect} from 'react';
import { getTasks } from '../services/task-service';
import { errorMessage } from '../services/sweet-alert-service';
import TaskTableWithPagination from '../components/TaskTableWithPagination';
import AutoCompleteInput from '../components/AutoCompleteInput';
import { dateTimeToDate } from '../utils/date-converter';
import '../styles/planning.css';

export default function Planning() {
    const [tasks, setTasks] = useState([]);
    const [planningDate, setPlanningDate] = useState(dateTimeToDate(new Date()));
    const [planningTasks, setPlanningTasks] = useState([]);

    useEffect(() => {
        let fetchTasks = async () => {
            try {
                const r = await getTasks();
                return await r.json();
            } catch (r_1) {
                errorMessage('Error', 'Error gettings the tasks please try again!')
                    .then(_ => window.location.reload());
            }
        }

        fetchTasks().then(data => {
            setTasks(data);
        })
    }, []);

    useEffect(() => {
        setPlanningTasks(tasks.filter(t => dateTimeToDate(t.dateTime) === planningDate));
    }, [planningDate, tasks])

    return (
        <React.Fragment>
            <section className="task-plan">
                <article className='name'>
                    <AutoCompleteInput collection={tasks} className="name"/>
                </article>
                <article className='date'>
                    <input type="date" value={planningDate} onChange={e => setPlanningDate(e.target.value)}/>
                </article>
            </section>
            <TaskTableWithPagination
                tasks={planningTasks}
                onTaskClick={_ => {}}/>
        </React.Fragment>
    );
}