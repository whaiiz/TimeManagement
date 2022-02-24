import React, { useState } from 'react'
import '../../styles/components/tasks/timer.css'

export default function TimerComponent() {
    const DEFAULT_TIME = 25;
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [time, setTime] = useState(DEFAULT_TIME);
    const [intervalId, setIntervalId] = useState('');

    const onSecondPassedTimer = () => {
        let newTime = time - 1;
        setTime(newTime);
    }

    const startTimer = _ => {
        setIsTimerRunning(true);
        setIntervalId(setInterval(onSecondPassedTimer, 1000));
    }

    const stopTimer = _ => {
        clearInterval(intervalId);
        setIsTimerRunning(false);
    }

    return(
        <section className='timer-container'>
            <label>{time}</label>
            { isTimerRunning ? <button className='stop-timer' onClick={stopTimer}>Stop</button>:
                <button className='start-timer' onClick={startTimer}>Start</button>
            }        
        </section>
    )
}
