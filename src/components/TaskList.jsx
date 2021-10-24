import React, {useState, useEffect} from 'react';
import Pagination from './Pagination';

import '../styles/task-list.css';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(5);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const fetchTasks = async () => {
        const response = await fetch('https://mocki.io/v1/94222b04-a2cc-4d99-a9b0-5ad4a5a40329');
        const responseJson = await response.json();

        setTasks(responseJson);
    }

    const paginate = (number) => setCurrentPage(number);

    useEffect(() => fetchTasks(), []);

    return (
        <React.Fragment>
            <section className="task-operations">
                <article className="search-container">
                    <input className="search-input" type="text" placeholder="Search" />
                </article>
                <article className="add-container">
                    <a href="#add-task" className="add-button">+</a>
                </article>
            </section>
            <table className="task-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTasks.map(w => (
                        <tr key={`task-${w.displayId}`}>
                            <td className="task-name">{w.name}</td>
                            <td className={`task-status ${w.status.toLowerCase()}-status`}>{w.status}</td>
                            <td className="task-date">{w.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                itemsPerPage={tasksPerPage} 
                itemsCount={tasks.length}
                paginate={paginate}>
            </Pagination>
        </React.Fragment>
    );
}
