import React, { useState, useEffect } from 'react';
import '../styles/auto-complete.css';

export default function AutoCompleteInput({collection, onItemClick}) {

    let [suggestions, setSuggestions] = useState(collection);
    let [areSuggestionsVisible, setAreSuggestionsVisible] = useState(true);

    let getSuggestions = ({target : {value}}) => {
        return collection.filter(t => t.name.toLowerCase().includes(value.toLowerCase()));
    }

    useEffect(() => {
        setSuggestions(collection)
    }, [collection])

    return(
        <form autoComplete="off">
            <section id="autocomplete" className="autocomplete">
                <input type="text" onInput={e => setSuggestions(getSuggestions(e))}
                                   onClick={_ => setAreSuggestionsVisible(true)}
                                   onBlur={_ => setAreSuggestionsVisible(false)}/>
                { areSuggestionsVisible && <article className="autocomplete-items">
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