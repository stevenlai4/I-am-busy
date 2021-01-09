import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import {
    AiOutlineUnorderedList,
    AiFillCalendar,
    AiFillHome,
} from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import '../style/global/navigation.scss';

export default function Navigation({ navToggle }) {
    const user = sessionStorage.getItem('user');

    return (
        <div className={`navigation ${navToggle ? 'appear' : ''}`}>
            <a className="logo" href="/">
                <h1>I AM BUSY</h1>
            </a>
            {user ? (
                <div>
                    <ul className="nav-list">
                        <a href="/user/todo">
                            <li className="nav-item">
                                <AiOutlineUnorderedList />

                                <span>TO DO</span>
                            </li>
                        </a>
                        <a href="/user/calendar">
                            <li className="nav-item">
                                <AiFillCalendar />

                                <span>CALENDAR</span>
                            </li>
                        </a>
                        <a href="/user">
                            <li className="nav-item">
                                <FaUserAlt />

                                <span>ACCOUNT</span>
                            </li>
                        </a>
                        <a href="/logout">
                            <li
                                className="nav-item"
                                onClick={() => {
                                    sessionStorage.clear();
                                }}
                            >
                                <BiLogOut />
                                <span>SIGN OUT</span>
                            </li>
                        </a>
                    </ul>
                </div>
            ) : (
                <div>
                    <ul className="nav-list">
                        <a href="/">
                            <li className="nav-item">
                                <AiFillHome />
                                <span>HOME</span>
                            </li>
                        </a>
                        <a href="/login">
                            <li className="nav-item">
                                <FaUserAlt />
                                <span>SIGN IN</span>
                            </li>
                        </a>
                    </ul>
                </div>
            )}
        </div>
    );
}
