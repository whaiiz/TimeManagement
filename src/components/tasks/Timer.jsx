import React, { useState, useEffect, useRef } from 'react'
import { secondsToTime } from '../../utils/date-time-converter'
import { errorMessage } from '../../utils/sweet-alert'
import { getUser } from '../../business-layer/user'
import '../../styles/components/tasks/timer.css'

export default function TimerComponent() {
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [time, setTime] = useState(1500);
    const [intervalId, setIntervalId] = useState('');
    const [defaultBreakTime, setDefaultBreakTime] = useState(300);
    const [defaultFocusTime, setDefaultFocusTime] = useState(1500);
    const [isFocusTime, setIsFocusTime] = useState(true);
    const intervalIdRef = useRef(intervalId);

    const onSecondPassedTimer = () => {
        setTime(previousTime =>  { 
            let newTime = previousTime - 1;

            if (newTime === 0) {
                setTime(defaultFocusTime);
                stopTimer();
                return 0;
            };

            return newTime;
        });
    }

    const startTimer = _ => {
        let newIntervalId = setInterval(onSecondPassedTimer, 1000);
        intervalIdRef.current = newIntervalId;
        setIsTimerRunning(true);
        setIntervalId(_ => newIntervalId);
    }

    const pauseTimer = _ => {
        clearInterval(intervalIdRef.current);
        setIsTimerRunning(false);
    }

    const stopTimer = _ => {
        clearInterval(intervalIdRef.current);
        setIsTimerRunning(false);
    }

    const selectFocusTime = () => {
        setIsFocusTime(true);
        setTime(defaultFocusTime);
        stopTimer();
    }

    const selectBreakTime = () => {
        setIsFocusTime(false);
        setTime(defaultBreakTime);
        stopTimer();
    }

    useEffect(() => {
        getUser().then(user => {
            if (!user) errorMessage("User not logged in").then(_ => window.location.href = '/Login');

            if (user.defaultBreakTime && user.defaultFocusTime) {
                setTime(user.defaultFocusTime);
                setDefaultBreakTime(user.defaultBreakTime);
                setDefaultFocusTime(user.defaultFocusTime);
            }
        })

        return () => clearInterval(intervalIdRef.current);
    }, [])

    return(
        <section className='timer-container'>
            <article className='timer-config'>
                <span className={ isFocusTime ? 'focus timer-selected': 'focus'} 
                    onClick={selectFocusTime}>Focus</span>
                <span className={ !isFocusTime ? 'break timer-selected': 'focus'}
                    onClick={selectBreakTime}>Break</span>
                <span className='settings fas fa-cog'></span>
            </article>
            <label className='time-left'>{secondsToTime(time)}</label>
            { isTimerRunning ? <button className='stop-timer' onClick={pauseTimer}>Pause</button>:
                <button className='start-timer' onClick={startTimer}>Start</button>
            }        
        </section>
    )
}