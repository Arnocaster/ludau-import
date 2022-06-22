import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './dynamicContainer.scss';

function DynamicContainer({
    children, style, className,
}) {
    const content = useRef(null);
    const [contSize, setContSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setContSize(content.current.getBoundingClientRect());
    }, [children]);

    return (
        <div
            className={className}
            style={{
                transition: '0.3s',
                height: `${contSize.height}px`,
                width: `${contSize.width}px`,
                overflow: 'hidden',
                margin: '0 auto',
                ...style,
            }}
        >
            <div
                ref={content}
                style={{
                    width: 'fit-content',
                    height: 'fit-content',
                    display: 'flex',
                    gap: '10px',
                }}
            >
                {children}
            </div>
        </div>
    );
}

DynamicContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.func,
        PropTypes.bool]).isRequired,
    style: PropTypes.oneOfType([
        PropTypes.shape({ minHeight: PropTypes.string, minWidth: PropTypes.string }),
        PropTypes.func]),
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func]),
};

DynamicContainer.defaultProps = {
    style: PropTypes.shape({ maxWidth: PropTypes.string, minHeight: PropTypes.string }),
    className: PropTypes.string,
};

export default React.memo(DynamicContainer);
