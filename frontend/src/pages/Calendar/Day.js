import React from 'react';
import '../../style/Day.scss';
import moment from 'moment';
import DayItem from './DayItem';

export default function Day({ day, year, month, todos }) {
    const createDayItems = (todo, index) => {
        const date = moment(todo.date.split('T')[0]);

        if (
            date.year() === year &&
            date.month() === month &&
            date.date() === day
        ) {
            // const dayElement = document.getElementById(
            //     `${year}/${month}/${day}`
            // );

            // console.log(dayElement);
            // dayElement.style.backgroundColor = '#dff28f';

            return <DayItem key={index} todo={todo} />;
        }
    };

    // Check if this todo box is today
    const isToday = () => {
        const todayYear = moment().year();
        const todayMonth = moment().month();
        const todayDay = moment().date();

        if (todayYear === year && todayMonth === month && todayDay === day) {
            return true;
        }

        return false;
    };

    return (
        <div className="day">
            <p className={`day-num ${isToday() ? 'today' : ''}`}>{day}</p>
            <div className="day-item-container">
                {todos.map(createDayItems)}
            </div>
        </div>
    );
}
