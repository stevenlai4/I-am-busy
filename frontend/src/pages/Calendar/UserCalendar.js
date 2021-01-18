import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import Weekday from './Weekday';
import Day from './Day';
import EmptyDay from './EmptyDay';
import { doomsdays, monthsAbbr, weekdays } from '../../data/Calendar';
import api from '../../services/api';
import '../../style/Calendar.scss';

export default function UserCalendar({ history }) {
    // Variables/Constants
    const TOTAL_CALENDAR_BOX = 42;
    const user = sessionStorage.getItem('user');

    // States
    const [year, setYear] = useState(0);
    const [monthIndex, setMonthIndex] = useState(0);
    const [toDos, setToDos] = useState([]);
    const [warningMsg, setWarningMsg] = useState('');

    if (!user) {
        history.push('/login');
    }

    // CDM
    useEffect(() => {
        setYear(moment().year());
        setMonthIndex(moment().month());
        fetchUserToDos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetch to do data
    const fetchUserToDos = async () => {
        try {
            let response = await api.get('/user/todo', {
                headers: {
                    user_id: user,
                },
            });

            if (response.data.message) {
                setWarningMsg(response.data.message);
            } else {
                setToDos(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Handle next month btn click
    const handleNextMonth = () => {
        if (monthIndex === 11) {
            setYear((prev) => prev + 1);
        }

        setMonthIndex((prev) => (prev + 1) % monthsAbbr.length);
    };

    // Handle previous month btn click
    const handlePrevMonth = () => {
        if (monthIndex === 0) {
            setYear((prev) => prev - 1);
        }

        setMonthIndex(
            (prev) => (prev - 1 + monthsAbbr.length) % monthsAbbr.length
        );
    };

    const createWeekDays = (weekday, index) => {
        return <Weekday key={index} weekday={weekday} />;
    };

    // Check if it's a leap year
    const isLeapYear = () => {
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
    };

    // Modulo for negative numbers
    const modulo = (n, m) => {
        return ((n % m) + m) % m;
    };

    // Find the date using duration
    const findFirstDayByDuration = (doomsWeekDay, doomsday) => {
        let num1 = modulo(1 - doomsday, 7);
        let num2 = modulo(num1 + doomsWeekDay, 7);

        return num2;
    };

    // Find the first day of each month
    const findFirstDayofMonth = () => {
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
            if (isLeapYear()) {
                return findFirstDayByDuration(doomsWeekDay, 4);
            } else {
                return findFirstDayByDuration(doomsWeekDay, 3);
            }
        } else if (monthIndex === 1) {
            if (isLeapYear()) {
                return findFirstDayByDuration(doomsWeekDay, 29);
            } else {
                return findFirstDayByDuration(doomsWeekDay, 28);
            }
        } else {
            return findFirstDayByDuration(doomsWeekDay, doomsdays[monthIndex]);
        }
    };

    const createCalDates = () => {
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
            for (let i = 0; i < findFirstDayofMonth(); i++) {
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
                    />
                );
            }
            // Create empty day boxes
            for (
                let i = 0;
                i < TOTAL_CALENDAR_BOX - 31 - findFirstDayofMonth();
                i++
            ) {
                days.push(<EmptyDay key={`month${monthIndex}-botEmp${i}`} />);
            }
        } else if (monthIndex === 1) {
            if (isLeapYear()) {
                // Create empty day boxes
                for (let i = 0; i < findFirstDayofMonth(); i++) {
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
                        />
                    );
                }
                // Create empty day boxes
                for (
                    let i = 0;
                    i < TOTAL_CALENDAR_BOX - 29 - findFirstDayofMonth();
                    i++
                ) {
                    days.push(
                        <EmptyDay key={`month${monthIndex}-botEmp${i}`} />
                    );
                }
            } else {
                // Create empty day boxes
                for (let i = 0; i < findFirstDayofMonth(); i++) {
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
                        />
                    );
                }
                // Create empty day boxes
                for (
                    let i = 0;
                    i < TOTAL_CALENDAR_BOX - 28 - findFirstDayofMonth();
                    i++
                ) {
                    days.push(
                        <EmptyDay key={`month${monthIndex}-botEmp${i}`} />
                    );
                }
            }
        } else {
            // Create empty day boxes
            for (let i = 0; i < findFirstDayofMonth(); i++) {
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
                    />
                );
            }
            // Create empty day boxes
            for (
                let i = 0;
                i < TOTAL_CALENDAR_BOX - 30 - findFirstDayofMonth();
                i++
            ) {
                days.push(<EmptyDay key={`month${monthIndex}-botEmp${i}`} />);
            }
        }

        return days;
    };

    return (
        <div className="calendar">
            {warningMsg ? <p className="warning-msg">{warningMsg}</p> : ''}
            <div className="year-container">
                <i onClick={handlePrevMonth}>
                    <BiLeftArrow />
                </i>
                <p className="year">
                    {year} {monthsAbbr[monthIndex]}
                </p>
                <i onClick={handleNextMonth}>
                    <BiRightArrow />
                </i>
            </div>
            <div className="weekdays">{weekdays.map(createWeekDays)}</div>
            <div className="days">{createCalDates()}</div>
        </div>
    );
}
