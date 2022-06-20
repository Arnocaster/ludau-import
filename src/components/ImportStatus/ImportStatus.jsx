import React from 'react';
import './importStatus.scss';
import { useSelector } from 'react-redux';

function ImportStatus() {
    const statusStore = useSelector((state) => state.importReducer);
    return (
        <div>{JSON.stringify(statusStore)}</div>
    );
}

export default React.memo(ImportStatus);
