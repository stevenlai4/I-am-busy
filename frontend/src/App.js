import React from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './pages/Navigation';
import Routes from './routes';
import './style/App.scss';

function App() {
    return (
        <Container className="App">
            <Navigation />
            <Routes />
        </Container>
    );
}

export default App;
