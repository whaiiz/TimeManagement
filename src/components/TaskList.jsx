import React, {useState, useEffect} from 'react'
import '../styles/work-items-list.css';
import '../styles/pagination.css';

export default function WorkItemsList() {
    const [workItems, setWorkItems] = useState([]);
    const init = () => {
        setWorkItems([
            {
                name: 'Play',
                status: "ToDo",
                date: '20/08/2000',
            },            
            {
                name: 'Fly',
                status: "Active",
                date: '20/08/2000',
            },            
            {
                name: 'Programming',
                status: "Done",
                date: '20/08/2000',
            },
            {
                name: 'Play',
                status: "ToDo",
                date: '20/08/2000',
            },            
            {
                name: 'Fly',
                status: "Active",
                date: '20/08/2000',
            },            
            {
                name: 'Programming',
                status: "Done",
                date: '20/08/2000',
            },
            {
                name: 'Play',
                status: "ToDo",
                date: '20/08/2000',
            },            
            {
                name: 'Fly',
                status: "Active",
                date: '20/08/2000',
            },            
            {
                name: 'Programming',
                status: "Done",
                date: '20/08/2000',
            },
        ]);
    }

    useEffect(() => init(), []);

    return (
        <React.Fragment>
            <section className="work-item-operations">
                <article className="search-container">
                    <input className="search-input" type="text" placeholder="Search" />
                </article>
                <article class="add-container">
                    <a href="#add-task" className="add-button">+</a>
                </article>
            </section>
            <table className="task-list">
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
                {
                    workItems.map(w => {
                        return(
                            <tr>
                                <td className="task-name">{w.name}</td>
                                <td className={`task-status ${w.status.toLowerCase()}-status`}>{w.status}</td>
                                <td class="task-date">{w.date}</td>
                            </tr>
                        )
                    })
                }
            </table>
            <nav class="pagination">
                <ul class="pagination-items">
                    <li><a href="#" class="pagination-item selected-item">1</a></li>
                    <li><a href="#" class="pagination-item">2</a></li>
                    <li><a href="#" class="pagination-item">3</a></li>
                    <li><a href="#" class="pagination-item">4</a></li>
                    <li><a href="#" class="pagination-item">5</a></li>
                </ul>
            </nav>
        </React.Fragment>
    );
}
