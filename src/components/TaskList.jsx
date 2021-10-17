import React, {useState, useEffect} from 'react'
import '../styles/work-items-list.css';

export default function WorkItemsList() {
    const [workItems, setWorkItems] = useState([]);

    const init = () => {
        setWorkItems([
            {
                name: 'Play',
                status: 0,
                date: '20/08/2000',
            },            
            {
                name: 'Fly',
                status: 1,
                date: '20/08/2000',
            },            
            {
                name: 'Programming',
                status: 2,
                date: '20/08/2000',
            },

        ]);
    }


    useEffect(() => init(), []);

    return (
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
                            <td class="work-item-name">Play</td>
                            <td class="work-item-status done-status">Done</td>
                            <td class="work-item-date">20/08/2020</td>
                        </tr>
                    )
                })
            }
        </table>
    );
}
