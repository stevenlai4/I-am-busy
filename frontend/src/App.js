import React from 'react';
import { Container } from 'react-bootstrap';
import Routes from './routes';

import './App.scss';

function App() {
    return (
        <Container className="App">
            <Routes />
        </Container>
    );
}

export default App;
