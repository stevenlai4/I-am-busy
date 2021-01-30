import React from 'react';
import '../../style/CalendarListItem.scss';

export default function CalListItem({ todo }) {
    return (
        <div className="calendar-list-item">
            <div class="title">
                <p>Title: </p>
                <p>{todo.title}</p>
            </div>
            <div className="date">
                <p>Date: </p>
                <p>{todo.date.split('T')[0]}</p>
            </div>
            <div className="weather">
                <p>Weather: </p>
                <p>{todo.weather}</p>
            </div>
        </div>
    );
}
