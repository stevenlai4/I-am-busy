import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Navigation from './pages/Navigation';
import Routes from './routes';
import './style/App.scss';

function App() {
    const [navToggle, setNavToggle] = useState(false);
    const [, setUser] = useState(false);

    const handleNavBg = () => {
        if (navToggle) {
            const nav = document.querySelector('.navigation');

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
            <Navigation navToggle={navToggle} setUser={setUser} />
            <Routes setUser={setUser} />
        </div>
    );
}

export default App;
