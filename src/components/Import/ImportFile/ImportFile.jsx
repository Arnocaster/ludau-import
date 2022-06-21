/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import {
    Paper, Typography, Chip, Grow,
} from '@mui/material';
import './importFile.scss';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';

function ImportFile({ file }) {
    const chipFeedback = {
        pending: {
            color: 'default',
            icon: <PendingIcon />,
        },
        invalid: {
            color: 'error',
            icon: <ErrorIcon />,
        },
        valid: {
            color: 'success',
            icon: <CheckCircleIcon />,
        },

    };

    return (
        <Grow
            in={!(!file.status)}
            style={{ transformOrigin: '0 0 0' }}
            {...(file.status ? { timeout: file.delay * 150 } : {})}
        >
            <Paper elevation={3} className="file">
                <Typography>{(file.name) ? file.name.slice(0, 10) : 'name'}</Typography>
                <Typography>{(file.type) ? file.type.split('/')[0] : 'type'}</Typography>
                <Typography>
                    {(file.size) ? Math.round(file.size / 1024) : 'size '}
                    {' '}
                    ko
                </Typography>
                <Chip
                    className={(file.status) ? 'file__status' : 'file__status--hidden'}
                    label={file.status || ''}
                    color={(chipFeedback[file.status]) ? chipFeedback[file.status].color : 'default'}
                    icon={(chipFeedback[file.status])
                        ? chipFeedback[file.status].icon
                        : <PendingIcon />}
                />
            </Paper>
        </Grow>
    );
}

ImportFile.propTypes = {
    file: PropTypes.shape({
        path: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        size: PropTypes.number,
        status: oneOfType([PropTypes.string, PropTypes.bool]),
        delay: PropTypes.number,

    }).isRequired,
    schemas: PropTypes.shape({
        user: PropTypes.arrayOf(PropTypes.string),
        game: PropTypes.arrayOf(PropTypes.string),
        booking: PropTypes.arrayOf(PropTypes.string),
        cost: PropTypes.arrayOf(PropTypes.string),

    }).isRequired,
};

export default React.memo(ImportFile);
