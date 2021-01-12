import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import {
    AiOutlineUnorderedList,
    AiFillCalendar,
    AiOutlineHistory,
} from 'react-icons/ai';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import '../style/global/navigation.scss';

export default function Navigation({ navToggle, setUser }) {
    const user = sessionStorage.getItem('user');

    return (
        <div
            className={`navigation ${navToggle ? 'appear' : ''}`}
            onMouseEnter={() => {
                const nav = document.querySelector('.navigation');
                nav.classList.add('hover');
            }}
            onMouseLeave={() => {
                const nav = document.querySelector('.navigation');
                nav.classList.remove('hover');
            }}
        >
            <a className="logo" href="/">
                <h1>I AM BUSY</h1>
            </a>
            {user ? (
                <div>
                    <ul className="nav-list">
                        <a href="/user/todo">
                            <li className="nav-item">
                                <i>
                                    <AiOutlineUnorderedList />
                                </i>

                                <span>TO DO</span>
                            </li>
                        </a>
                        <a href="/user/calendar">
                            <li className="nav-item">
                                <i>
                                    <AiFillCalendar />
                                </i>

                                <span>CALENDAR</span>
                            </li>
                        </a>
                        <a href="/user/todo/history">
                            <li className="nav-item">
                                <i>
                                    <AiOutlineHistory />
                                </i>

                                <span>HISTORY</span>
                            </li>
                        </a>
                        <a href="/user">
                            <li className="nav-item">
                                <i>
                                    <FaUserAlt />
                                </i>

                                <span>ACCOUNT</span>
                            </li>
                        </a>
                        <a href="/">
                            <li
                                className="nav-item"
                                onClick={() => {
                                    sessionStorage.clear();
                                    setUser(false);
                                }}
                            >
                                <i>
                                    <BiLogOut />
                                </i>
                                <span>SIGN OUT</span>
                            </li>
                        </a>
                    </ul>
                </div>
            ) : (
                <div>
                    <ul className="nav-list">
                        <a href="/login">
                            <li className="nav-item">
                                <i>
                                    <BiLogIn />
                                </i>
                                <span>SIGN IN</span>
                            </li>
                        </a>
                    </ul>
                </div>
            )}
        </div>
    );
}
