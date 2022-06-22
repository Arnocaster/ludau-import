import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Import from '../Import/Import';
import References from '../References/References';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Home content={<Import />} />} />
                <Route exact path="/references" element={(<Home content={<References />} />)} />
                <Route exact path="/import" element={(<Home content={<Import />} />)} />
            </Routes>
        </div>
    );
}

export default App;
