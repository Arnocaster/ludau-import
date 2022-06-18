import React from 'react';
import PropTypes from 'prop-types';
// import { Box } from '@mui/material';
import Header from './Header/Header';
import Content from './Content/Content';

function Home({ content }) {
    return (
        <div>
            <Header />
            <Content content={content} />
        </div>
    );
}

Home.propTypes = {
    content: PropTypes.element,
};

Home.defaultProps = {
    content: PropTypes.element,
};

export default React.memo(Home);
