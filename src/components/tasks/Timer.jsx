import React, { useState, useEffect, useRef } from 'react'
import '../../styles/components/tasks/timer.css'

export default function TimerComponent() {
    const DEFAULT_TIME = 2;
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [time, setTime] = useState(DEFAULT_TIME);
    const [intervalId, setIntervalId] = useState('');
    const intervalIdRef = useRef(intervalId);

    const onSecondPassedTimer = () => {
        setTime(previousTime =>  { 
            let newTime = previousTime - 1;

            if (newTime === 0) {
                setTime(DEFAULT_TIME);
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

    const stopTimer = _ => {
        clearInterval(intervalIdRef.current);
        setIsTimerRunning(false);
    }

    useEffect(() => {
      return () => clearInterval(intervalIdRef.current);
    }, [])

    
    return(
        <section className='timer-container'>
            <label>{time}</label>
            { isTimerRunning ? <button className='stop-timer' onClick={stopTimer}>Stop</button>:
                <button className='start-timer' onClick={startTimer}>Start</button>
            }        
        </section>
    )
}
