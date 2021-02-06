import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import Weekday from './Weekday';
import CalListItem from './CalListItem';
import CalFunc from '../../functions/Calendar';
import { monthsAbbr, weekdays } from '../../data/Calendar';
import api from '../../services/api';
import '../../style/Calendar.scss';

export default function UserCalendar({ history }) {
    // Variables/Constants
    const user = sessionStorage.getItem('user');

    // States
    const [year, setYear] = useState(0);
    const [monthIndex, setMonthIndex] = useState(0);
    const [toDos, setToDos] = useState([]);
    const [warningMsg, setWarningMsg] = useState('');
    const [selectedDate, setSelectedDate] = useState(
        new Date(moment().format('YYYY-MM-DD'))
    );

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
                    user: user,
                },
            });

            setToDos(response.data);
        } catch (error) {
            setWarningMsg(error.response.data.message);
        }
    };

    // Create Monday - Friday components
    const createWeekDays = (weekday, index) => {
        return <Weekday key={index} weekday={weekday} />;
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

    return (
        <>
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
                <div className="days">
                    {CalFunc.createCalDates(
                        toDos,
                        year,
                        monthIndex,
                        setSelectedDate
                    )}
                </div>
            </div>
            <div className="calendar-item-list">
                {toDos.map((todo) => {
                    const date = moment(todo.date.split('T')[0]);
                    const targetedDate = moment(
                        selectedDate.toISOString().split('T')[0]
                    );

                    if (
                        date.year() === targetedDate.year() &&
                        date.month() === targetedDate.month() &&
                        date.date() === targetedDate.date()
                    ) {
                        return <CalListItem key={todo._id} todo={todo} />;
                    }

                    return null;
                })}
            </div>
        </>
    );
}
