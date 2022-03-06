import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import '../../styles/components/modals/timer-settings-modal.css'
import { updateUserDefaultBreakTime, updateUserDefaultFocusTime} from '../../business-layer/user'
import { secondsToHoursMinutesFormat, hoursMinuteFormatToSeconds } from '../../utils/date-time-converter'

export default function TimerSettingsModal({isVisible, closeModalCallback, userSettings, onSavedSettings}) {
    const [defaultBreakTime, setDefaultBreakTime] = useState(300);
    const [defaultFocusTime, setDefaultFocusTime] = useState(1500);

    const saveSettings = async _ => {
        let successUpdatingDefaultBreakTime = await updateUserDefaultBreakTime(defaultBreakTime);
        let successUpdatingDefaultFocusTime = await updateUserDefaultFocusTime(defaultFocusTime);

        if (successUpdatingDefaultBreakTime && successUpdatingDefaultFocusTime) {
            onSavedSettings(defaultBreakTime, defaultFocusTime);
            closeModalCallback();
        }
    }

    useEffect(() => {
        setDefaultBreakTime(userSettings.defaultBreakTime);
        setDefaultFocusTime(userSettings.defaultFocusTime);
    }, [userSettings.defaultBreakTime, userSettings.defaultFocusTime])
    
    return(
        <Modal
            Header={
                <React.Fragment>
                    <h1 className='modal-title'>Timer Settings</h1>
                    <span className='close-timer-settings' onClick={closeModalCallback}>&times;</span>
                </React.Fragment>
            }
            Body={
                <form className='timer-settings-form'>
                    <article>
                        <label>Focus time (hh:mm)</label>
                        <input type='time' className='default-focus-time' value={secondsToHoursMinutesFormat(defaultFocusTime)}
                            onChange={e => setDefaultFocusTime(hoursMinuteFormatToSeconds(e.target.value))} />
                    </article>
                    <article>
                        <label>Break time (hh:mm)</label>
                        <input type='time' className='default-break-time' value={secondsToHoursMinutesFormat(defaultBreakTime)}
                            onChange={e => setDefaultBreakTime(hoursMinuteFormatToSeconds(e.target.value))} />
                    </article>
                </form>
            }
            Footer={<button className='save-timer-settings' onClick={saveSettings}>Save</button>}
            isVisible={isVisible}
        />
    )
}
