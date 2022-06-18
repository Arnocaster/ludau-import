import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Import from '../Import/Import';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Home content={<Import />} />} />
                <Route exact path="/import" element={(<Home content={<Import />} />)} />
            </Routes>
        </div>
    );
}

export default App;
