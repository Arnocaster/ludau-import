import React from 'react';
import './importStatus.scss';
import { useSelector } from 'react-redux';
import {
    Chip, Stack, Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

function ImportStatus() {
    const statusStore = useSelector((state) => state.importReducer);
    const importOk = Object.keys(statusStore).every((key) => statusStore[key].status);
    return (
        <>
            <Chip
                label="IMPORT"
                className="import-status__chip"
                color={(!importOk) ? 'error' : 'success'}
                icon={(!importOk) ? <ErrorIcon /> : <CheckCircleIcon />}
            />
            <Stack
                className="import-status__stack"
                direction="row"
                justifyContent="center"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                {Object.keys(statusStore).map((key) => (
                    <Chip
                        className="import-status__chip"
                        key={key}
                        label={key}
                        color={(!statusStore[key].status) ? 'error' : 'success'}
                        icon={(!statusStore[key].status) ? <ErrorIcon /> : <CheckCircleIcon />}
                    />
                ))}
            </Stack>
        </>
    );
}

export default React.memo(ImportStatus);
