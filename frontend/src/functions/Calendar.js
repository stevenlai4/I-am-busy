import Day from '../pages/Calendar/Day';
import EmptyDay from '../pages/Calendar/EmptyDay';
import { doomsdays } from '../data/Calendar';

const TOTAL_CALENDAR_BOX = 42;

const CalFunc = {
    // Check if it's a leap year
    isLeapYear(year) {
        if (year % 4 === 0) {
            if (year % 100 === 0) {
                if (year % 400 === 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    // Modulo for negative numbers
    modulo(n, m) {
        return ((n % m) + m) % m;
    },
    // Find the date using duration
    findFirstDayByDuration(doomsWeekDay, doomsday) {
        let num1 = this.modulo(1 - doomsday, 7);
        let num2 = this.modulo(num1 + doomsWeekDay, 7);

        return num2;
    },
    // Find the first day of each month
    findFirstDayofMonth(year, monthIndex) {
        let num1 = Math.floor((year % 100) / 12);
        let num2 = (year % 100) - 12 * num1;
        let num3 = Math.floor(num2 / 4);
        let num4 = 0;

        if (Math.abs(Math.floor(year / 100) * 100 - 2000) % 400 === 0) {
            num4 = 2;
        } else if (Math.abs(Math.floor(year / 100) * 100 - 2000) % 300 === 0) {
            num4 = 3;
        } else if (Math.abs(Math.floor(year / 100) * 100 - 2000) % 200 === 0) {
            num4 = 5;
        } else {
            num4 = 0;
        }

        const doomsWeekDay = num1 + num2 + num3 + num4 - 7;

        if (monthIndex === 0) {
            if (this.isLeapYear(year)) {
                return this.findFirstDayByDuration(doomsWeekDay, 4);
            } else {
                return this.findFirstDayByDuration(doomsWeekDay, 3);
            }
        } else if (monthIndex === 1) {
            if (this.isLeapYear(year)) {
                return this.findFirstDayByDuration(doomsWeekDay, 29);
            } else {
                return this.findFirstDayByDuration(doomsWeekDay, 28);
            }
        } else {
            return this.findFirstDayByDuration(
                doomsWeekDay,
                doomsdays[monthIndex]
            );
        }
    },
    createCalDates(toDos, year, monthIndex, setSelectedDate) {
        let days = [];

        if (
            monthIndex === 0 ||
            monthIndex === 2 ||
            monthIndex === 4 ||
            monthIndex === 6 ||
            monthIndex === 7 ||
            monthIndex === 9 ||
            monthIndex === 11
        ) {
            // Create empty day boxes
            for (
                let i = 0;
                i < this.findFirstDayofMonth(year, monthIndex);
                i++
            ) {
                days.push(<EmptyDay key={`month${monthIndex}-topEmp${i}`} />);
            }
            // Create day boxes
            for (let day = 0; day < 31; day++) {
                days.push(
                    <Day
                        key={`${year}/${monthIndex}/${day}`}
                        todos={toDos}
                        year={year}
                        month={monthIndex}
                        day={day + 1}
                        setSelectedDate={setSelectedDate}
                    />
                );
            }
            // Create empty day boxes
            for (
                let i = 0;
                i <
                TOTAL_CALENDAR_BOX -
                    31 -
                    this.findFirstDayofMonth(year, monthIndex);
                i++
            ) {
                days.push(<EmptyDay key={`month${monthIndex}-botEmp${i}`} />);
            }
        } else if (monthIndex === 1) {
            if (this.isLeapYear(year)) {
                // Create empty day boxes
                for (
                    let i = 0;
                    i < this.findFirstDayofMonth(year, monthIndex);
                    i++
                ) {
                    days.push(
                        <EmptyDay key={`month${monthIndex}-topEmp${i}`} />
                    );
                }
                // Create day boxes
                for (let day = 0; day < 29; day++) {
                    days.push(
                        <Day
                            key={`${year}/${monthIndex}/${day}`}
                            todos={toDos}
                            year={year}
                            month={monthIndex}
                            day={day + 1}
                            setSelectedDate={setSelectedDate}
                        />
                    );
                }
                // Create empty day boxes
                for (
                    let i = 0;
                    i <
                    TOTAL_CALENDAR_BOX -
                        29 -
                        this.findFirstDayofMonth(year, monthIndex);
                    i++
                ) {
                    days.push(
                        <EmptyDay key={`month${monthIndex}-botEmp${i}`} />
                    );
                }
            } else {
                // Create empty day boxes
                for (
                    let i = 0;
                    i < this.findFirstDayofMonth(year, monthIndex);
                    i++
                ) {
                    days.push(
                        <EmptyDay key={`month${monthIndex}-topEmp${i}`} />
                    );
                }
                // Create day boxes
                for (let day = 0; day < 28; day++) {
                    days.push(
                        <Day
                            key={`${year}/${monthIndex}/${day}`}
                            todos={toDos}
                            year={year}
                            month={monthIndex}
                            day={day + 1}
                            setSelectedDate={setSelectedDate}
                        />
                    );
                }
                // Create empty day boxes
                for (
                    let i = 0;
                    i <
                    TOTAL_CALENDAR_BOX -
                        28 -
                        this.findFirstDayofMonth(year, monthIndex);
                    i++
                ) {
                    days.push(
                        <EmptyDay key={`month${monthIndex}-botEmp${i}`} />
                    );
                }
            }
        } else {
            // Create empty day boxes
            for (
                let i = 0;
                i < this.findFirstDayofMonth(year, monthIndex);
                i++
            ) {
                days.push(<EmptyDay key={`month${monthIndex}-topEmp${i}`} />);
            }
            // Create day boxes
            for (let day = 0; day < 30; day++) {
                days.push(
                    <Day
                        key={`${year}/${monthIndex}/${day}`}
                        todos={toDos}
                        year={year}
                        month={monthIndex}
                        day={day + 1}
                        setSelectedDate={setSelectedDate}
                    />
                );
            }
            // Create empty day boxes
            for (
                let i = 0;
                i <
                TOTAL_CALENDAR_BOX -
                    30 -
                    this.findFirstDayofMonth(year, monthIndex);
                i++
            ) {
                days.push(<EmptyDay key={`month${monthIndex}-botEmp${i}`} />);
            }
        }

        return days;
    },
};

export default CalFunc;
