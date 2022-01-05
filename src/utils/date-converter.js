export const dateTimeToDate = (dateTime) => {
    let date = new Date(dateTime);
    return date.getFullYear().toString() + '-' + 
           (date.getMonth() + 1).toString().padStart(2, '0') + '-' + 
           date.getDate().toString().padStart(2, '0');
}