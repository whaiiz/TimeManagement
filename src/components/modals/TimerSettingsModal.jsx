import React from 'react'
import Modal from './Modal'

export default function TimerSettingsModal() {
    
    const saveSettings = () => {

    }

    return(
        <Modal
            Header={<h1>Timer Settings</h1>}
            Body={
                <form>
                    <article>
                        <label>Break time</label>
                        <input type="time" />
                    </article>
                    <article>
                        <label>Focus time</label>
                        <input type="time" />
                    </article>
                </form>
            }
            Footer={<button onClick='saveSettings'>Save</button>}
        />
    )
}
