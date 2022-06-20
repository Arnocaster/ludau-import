import React from 'react';
import PropTypes from 'prop-types';
import './importFile.scss';

function ImportFile({ file }) {
    return (
        <div>
            <p>{file.data.name}</p>
            <p>{file.data.type}</p>
            <p>{file.data.size}</p>
            <p>{file.status}</p>
        </div>
    );
}

ImportFile.propTypes = {
    file: PropTypes.shape({
        data: PropTypes.shape({
            path: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string,
            size: PropTypes.number,
        }),
        status: PropTypes.string,

    }).isRequired,
};

export default React.memo(ImportFile);
