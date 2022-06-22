/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './content.scss';

function Content({ content }) {
    const headerSizeStore = useSelector((state) => state.dynamicContentReducer);
    const headerHeight = headerSizeStore.height;

    return (
        <div
            className="content"
            style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
        >
            {content}
        </div>
    );
}

Content.propTypes = {
    content: PropTypes.element,
};

Content.defaultProps = {
    content: PropTypes.element,
};

export default React.memo(Content);
