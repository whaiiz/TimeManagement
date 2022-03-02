export const dateTimeToDate = (dateTime) => {
    let date = new Date(dateTime);
    return date.getFullYear().toString() + '-' + 
           (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
           date.getUTCDate().toString().padStart(2, '0')
}

export const isDateTimeToday = dateTime => {
    const date = dateTimeToDate(dateTime);
    const todayDate = dateTimeToDate(new Date());

    console.log(date === todayDate)
    return date === todayDate;
}