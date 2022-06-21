import React from 'react';
import './importStatus.scss';
import { useSelector } from 'react-redux';
import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

function ImportStatus() {
    const statusStore = useSelector((state) => state.importReducer);
    console.log();
    return (
        <div>
            {Object.keys(statusStore).map((key) => (
                <Chip
                    className="status__chip"
                    key={key}
                    label={key}
                    color={(!statusStore[key].status) ? 'error' : 'success'}
                    icon={(!statusStore[key].status) ? <ErrorIcon /> : <CheckCircleIcon />}
                />
            ))}
        </div>
    );
}

export default React.memo(ImportStatus);
