import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import {
    AiOutlineUnorderedList,
    AiFillCalendar,
    AiFillHome,
} from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import '../style/global/navigation.scss';

export default function Navigation() {
    const user = sessionStorage.getItem('user');

    return (
        <div className="navigation">
            <h1>I AM BUSY</h1>
            {user ? (
                <div>
                    <ul className="nav-list">
                        <li>
                            <i>
                                <AiFillHome />
                            </i>
                            <span>HOME</span>
                        </li>
                        <li>
                            <i>
                                <AiOutlineUnorderedList />
                            </i>
                            <span>TO DO</span>
                        </li>
                        <li>
                            <i>
                                <AiFillCalendar />
                            </i>
                            <span>CALENDAR</span>
                        </li>
                        <li>
                            <i>
                                <FaUserAlt />
                            </i>
                            <span>ACCOUNT</span>
                        </li>
                        <li>
                            <i>
                                <BiLogOut />
                            </i>
                            <span>SIGN OUT</span>
                        </li>
                    </ul>
                </div>
            ) : (
                <div>
                    <ul className="nav-list">
                        <li>
                            <i>
                                <AiFillHome />
                            </i>
                            <span>HOME</span>
                        </li>
                        <li>
                            <i>
                                <FaUserAlt />
                            </i>
                            <span>SIGN IN</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
