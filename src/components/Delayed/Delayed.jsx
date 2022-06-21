import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './delayed.scss';

function Delayed({ children, delay = 500 }) {
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplay(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);
    return display ? children : null;
}

Delayed.propTypes = {
    children: PropTypes.element.isRequired,
    delay: PropTypes.number.isRequired,
};

export default React.memo(Delayed);
