class AlarmClock{
	constructor(){
		this.alarmCollection = [];
		this.timerId = null;
	}
	addClock(time, callback, id){
		if (id != undefined){
			const indx = this.alarmCollection.findIndex(alarm => alarm.id === id);
			if (indx >= 0){
				console.error("Уже существует звонок с таким id!");
			}else{
				this.alarmCollection.push({id,time,callback});
			}
		}else{
			throw new Error("Невозможно идентифицировать будильник. Параметр id не передан.");
		}
	}
	removeClock(id){
		const len = this.alarmCollection.length;
		this.alarmCollection = this.alarmCollection.filter((alarm) => alarm.id != id);
		if (this.alarmCollection.length === len) return 0;
		else return 1;
	}
	getCurrentFormattedTime(){
		const dateNow = new Date();
		const hours = dateNow.getHours() < 10 ? `0${dateNow.getHours()}` : `${dateNow.getHours()}`;
    const minutes = dateNow.getMinutes() < 10 ? `0${dateNow.getMinutes()}` : `${dateNow.getMinutes()}`;
    return hours+":"+minutes;
	}
	start(){
		const checkClock = () => {
			const timeNow = this.getCurrentFormattedTime();
			const alarms = this.alarmCollection.filter((alarm) => alarm.time === timeNow);
			alarms.forEach((alarm) => alarm.callback());
		}
		if (!this.timerId) this.timerId = setInterval(checkClock, 5000);
	}
	stop(){
		if (this.timerId) {
			clearInterval(this.timerId);
			this.timerId = null;
		}
	}
	printAlarms(){
		this.alarmCollection.forEach((alarm) => console.log("id:", alarm.id, "time:", alarm.time));
	}
	clearAlarms(){
		this.stop();
		this.alarmCollection.length = 0;
	}
}

function getTimeAddMinute(add = 0){
	const dateNow = new Date(Number(new Date) + (60000 * add));
	const hours = dateNow.getHours() < 10 ? `0${dateNow.getHours()}` : `${dateNow.getHours()}`;
  const minutes = dateNow.getMinutes() < 10 ? `0${dateNow.getMinutes()}` : `${dateNow.getMinutes()}`;
  return hours+":"+minutes;
}

console.log(getTimeAddMinute(5));

const phoneAlarm = new AlarmClock();

phoneAlarm.addClock(getTimeAddMinute(0), () => console.log("Пора вставать"), 1);
phoneAlarm.addClock(getTimeAddMinute(0), () => console.log("Можешь не вставать =))"), 2);
phoneAlarm.addClock(getTimeAddMinute(1), () => {console.log("Давай, вставай уже!"); phoneAlarm.removeClock(3)}, 3);
try{
	phoneAlarm.addClock(getTimeAddMinute(1), () => console.log("Иди умываться!"));
}catch(err){
	console.error(err.message);
}
phoneAlarm.addClock(getTimeAddMinute(2), () => {
	console.log("Вставай, а то проспишь!")
	phoneAlarm.clearAlarms();
	phoneAlarm.printAlarms();
}, 4);

phoneAlarm.addClock(getTimeAddMinute(3), () => console.log("Вставай, а то проспишь!"), 1);
phoneAlarm.printAlarms();
phoneAlarm.start();