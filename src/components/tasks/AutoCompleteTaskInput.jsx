import React, { useState, useEffect } from 'react';
import '../../styles/common/auto-complete.css';

export default function AutoCompleteInput({collection, onItemClick, addNewTaskCb}) {

    const [suggestions, setSuggestions] = useState(collection);
    const [areSuggestionsVisible, setAreSuggestionsVisible] = useState(false);
    const [taskSearched, setTaskSearched] = useState('');

    const onSearchTaskInput = ({target : {value}}) => {
        setTaskSearched(value);
        setSuggestions(getSuggestions(value));
    }

    const addNewTask = taskSearched => {
        addNewTaskCb(taskSearched);
        setTaskSearched('');
    }

    const getSuggestions = (searchedValue) => {
        return collection.filter(t => t.name.toLowerCase().includes(searchedValue.toLowerCase()));
    }
 
    useEffect(() => {
        setSuggestions(collection)
    }, [collection])

    return (
        <form autoComplete="off">
            <section className="auto-complete">
                <input type="text" onInput={e => onSearchTaskInput(e)}
                                   onClick={_ => setAreSuggestionsVisible(true)}
                                   onBlur={_ => setTimeout(_ => setAreSuggestionsVisible(false), 100)}
                                   placeholder="Search task" />
                { areSuggestionsVisible && <article className="auto-complete-items">
                    {
                        suggestions.map(s => {
                            return (
                                <div key={s.id} onClick={_ => onItemClick(s.id)}>
                                    <label>{s.name}</label>
                                </div>
                            )
                        })
                    }
                    { taskSearched.length > 0 && <div onClick={_ => addNewTask(taskSearched)}>
                        <label>Add new task named {taskSearched}</label>
                    </div> }
                </article> }
            </section>
        </form>
    )
}