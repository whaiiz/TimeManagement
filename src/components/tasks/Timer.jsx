import React, { useState, useEffect, useRef } from 'react'
import { secondsToHoursMinutesSecondsFormat } from '../../utils/date-time-converter'
import { errorMessage } from '../../utils/sweet-alert'
import { getUser } from '../../business-layer/users/get-user'
import '../../styles/components/tasks/timer.css'
import TimerSettingsModal from '../modals/TimerSettingsModal'

export default function TimerComponent() {
    const [intervalId, setIntervalId] = useState('');
    const intervalIdRef = useRef(intervalId);
    
    const [time, setTime] = useState(1500);
    const [defaultBreakTime, setDefaultBreakTime] = useState(300);
    const [defaultFocusTime, setDefaultFocusTime] = useState(1500);

    const [isFocusTime, setIsFocusTime] = useState(true);
    const [isTimerSettingModalVisible, setIsTimerSettingModalVisible] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const onSecondPassedTimer = () => {
        setTime(previousTime =>  { 
            let newTime = previousTime - 1;

            if (newTime === 0) {
                setTime(defaultFocusTime);
                onTimeEnding();
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

    const onTimeEnding = _ => {
        let audio = new Audio("/alarm.mp3");
        audio.play();

        if (!isFocusTime) setTime(defaultFocusTime);
        else setTime(defaultBreakTime);

        setIsFocusTime(!isFocusTime);
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

    const onSavedSettings = (updatedDefaultBreakTime, updatedDefaultFocusTime) => {
        setDefaultBreakTime(updatedDefaultBreakTime);
        setDefaultFocusTime(updatedDefaultFocusTime);
        setIsTimerSettingModalVisible(false);

        if (isFocusTime) setTime(updatedDefaultFocusTime);
        else setTime(updatedDefaultBreakTime);
    }

    useEffect(() => {
        getUser().then(response => {
            const { user, userNotLoggedIn } = response; 

            if (userNotLoggedIn) errorMessage("User not logged in").then(_ => window.location.href = '/Login');
            if (user.defaultBreakTime) setDefaultBreakTime(user.defaultBreakTime);
            if (user.defaultFocusTime) {
                setTime(user.defaultFocusTime);
                setDefaultFocusTime(user.defaultFocusTime);
            }
        })

        return () => clearInterval(intervalIdRef.current);
    }, []);

    useEffect(() => {

    }, [isFocusTime]);

    return(
        <React.Fragment>
            <section className='timer-container'>
                <article className='timer-config'>
                    <span className={ isFocusTime ? 'focus timer-selected': 'focus'} 
                        onClick={selectFocusTime}>Focus</span>
                    <span className={ !isFocusTime ? 'break timer-selected': 'focus'}
                        onClick={selectBreakTime}>Break</span>
                    <span className='settings fas fa-cog' 
                        onClick={_ => setIsTimerSettingModalVisible(true)}></span>
                </article>
                <label className='time-left'>{secondsToHoursMinutesSecondsFormat(time)}</label>
                { isTimerRunning ? <button className='stop-timer' onClick={pauseTimer}>Pause</button>:
                    <button className='start-timer' onClick={startTimer}>Start</button>
                }        
            </section>
            <TimerSettingsModal 
                isVisible={isTimerSettingModalVisible}
                closeModalCallback={_ => setIsTimerSettingModalVisible(false)}
                onSavedSettings={onSavedSettings}
                userSettings={{defaultBreakTime, defaultFocusTime}}/>
        </React.Fragment>
    )
}