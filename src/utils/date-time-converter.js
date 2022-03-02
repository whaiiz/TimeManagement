export const dateTimeToDate = (dateTime) => {
    let date = new Date(dateTime);
    return date.getFullYear().toString() + '-' + 
           (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
           date.getUTCDate().toString().padStart(2, '0')
}

export const isDateTimeToday = dateTime => {
    return dateTimeToDate(dateTime) === dateTimeToDate(new Date());
}

export const secondsToTime = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
}