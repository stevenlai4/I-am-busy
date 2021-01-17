import React from 'react';
import '../../style/Weekday.scss';

export default function Weekday({ weekday }) {
    return (
        <>
            <p className="weekday small">{weekday.substring(0, 2)}</p>
            <p className="weekday medium">{weekday.substring(0, 3)}</p>
        </>
    );
}
