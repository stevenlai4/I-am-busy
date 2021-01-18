import React from 'react';
import '../../style/DayItem.scss';

export default function DayItem({ todo }) {
    return (
        <div className="day-item">
            <p className="title">{todo.title}</p>
        </div>
    );
}
