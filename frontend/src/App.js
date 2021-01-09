import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import Navigation from './pages/Navigation';
import Routes from './routes';
import './style/App.scss';

function App() {
    const [navToggle, setNavToggle] = useState(false);

    const handleNavBg = (e) => {
        if (navToggle) {
            const nav = document.querySelector('.navigation');

            e.target.classList.remove('appear');
            nav.classList.remove('appear');
            setNavToggle((prev) => !prev);
        }
    };

    return (
        <div
            className="App"
            style={{
                height: navToggle ? '100vh' : '100%',
                overflow: navToggle ? 'hidden' : 'auto',
            }}
        >
            <i
                className="nav-toggle"
                onClick={() => setNavToggle((prev) => !prev)}
            >
                <AiOutlineMenu />
            </i>
            <div
                className={`nav-bg ${navToggle ? 'appear' : ''}`}
                onClick={handleNavBg}
            ></div>
            <Navigation navToggle={navToggle} />
            <Routes />
        </div>
    );
}

export default App;
