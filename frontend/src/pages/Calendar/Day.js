import React from 'react';
import '../../style/Day.scss';

export default function Day({ day }) {
    return (
        <div className="day">
            <p>{day}</p>
        </div>
    );
}
