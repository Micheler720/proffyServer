export default function convertHourToMinute(time: string){
    const [hour, minutes] = time.split(':').map(Number);
    const timeMinutes = (hour * 60) + minutes;
    return timeMinutes;
}