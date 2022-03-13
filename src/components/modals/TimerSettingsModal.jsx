import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import '../../styles/components/modals/timer-settings-modal.css'
import { updateUserDefaultBreakTime } from '../../business-layer/users/update-user-default-break-time'
import { updateUserDefaultFocusTime } from '../../business-layer/users/update-user-default-focus-time'
import { secondsToHoursMinutesFormat, hoursMinuteFormatToSeconds } from '../../utils/date-time-converter'
import { errorMessage } from '../../utils/sweet-alert'

export default function TimerSettingsModal({isVisible, closeModalCallback, userSettings, onSavedSettings}) {
    const [defaultBreakTime, setDefaultBreakTime] = useState(300);
    const [defaultFocusTime, setDefaultFocusTime] = useState(1500);

    const saveSettings = async _ => {
        let updateDefaultBreakTimeResponse = await updateUserDefaultBreakTime(defaultBreakTime);
        let updateDefaultFocusTimeResponse = await updateUserDefaultFocusTime(defaultFocusTime);

        if (updateDefaultBreakTimeResponse.userNotLoggedIn || updateDefaultFocusTimeResponse.userNotLoggedIn) {
            window.location.href = '/Login';
        } 

        if (updateDefaultBreakTimeResponse.success || updateDefaultFocusTimeResponse.success) {
            onSavedSettings(defaultBreakTime, defaultFocusTime);
            closeModalCallback();
        }
        else errorMessage("Error", "Something went wrong").then(_ => window.location.href = '/Login');
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
