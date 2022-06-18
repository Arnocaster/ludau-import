/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import './papaparse.scss';

import {
    useCSVReader,
    formatFileSize,
} from 'react-papaparse';

export default function Papaparse() {
    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);

    return (
        <CSVReader
            onUploadAccepted={(results) => {
                console.log('---------------------------');
                console.log(results);
                console.log('---------------------------');
                setZoneHover(false);
            }}
            onDragOver={(event) => {
                event.preventDefault();
                setZoneHover(true);
            }}
            onDragLeave={(event) => {
                event.preventDefault();
                setZoneHover(false);
            }}
            noClick
        >
            {({
                getRootProps,
                acceptedFile,
                ProgressBar,
                getRemoveFileProps,
            }) => (
                <div
                    {...getRootProps()}
                    className={(zoneHover) ? 'zone zoneHover' : 'zone'}
                >
                    {acceptedFile ? (
                        <div className="file">
                            <div className="info">
                                <span className="size">
                                    {formatFileSize(acceptedFile.size)}
                                </span>
                                <span className="name">{acceptedFile.name}</span>
                            </div>
                            <div className="progressBar">
                                <ProgressBar />
                            </div>
                            <div
                                {...getRemoveFileProps()}
                                className="remove"
                                onMouseOver={(event) => {
                                    event.preventDefault();
                                }}
                                onMouseOut={(event) => {
                                    event.preventDefault();
                                }}
                            />
                        </div>
                    ) : (
                        'Drop CSV file here to upload'
                    )}
                </div>
            )}
        </CSVReader>
    );
}
