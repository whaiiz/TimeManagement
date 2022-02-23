import React, { useState, useEffect } from 'react';
import '../../styles/common/auto-complete.css';

export default function AutoCompleteInput({collection, onItemClick}) {

    const [suggestions, setSuggestions] = useState(collection);
    const [areSuggestionsVisible, setAreSuggestionsVisible] = useState(false);

    const getSuggestions = ({target : {value}}) => {
        return collection.filter(t => t.name.toLowerCase().includes(value.toLowerCase()));
    }
 
    useEffect(() => {
        setSuggestions(collection)
    }, [collection])

    return(
        <form autoComplete="off">
            <section className="auto-complete">
                <input type="text" onInput={e => setSuggestions(getSuggestions(e))}
                                   onClick={_ => setAreSuggestionsVisible(true)}
                                   onBlur={_ => setTimeout(_ => setAreSuggestionsVisible(false), 100)} />
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
                </article> }
            </section>
        </form>
    )
}