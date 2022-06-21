/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import './import.scss';
import Dropzone from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import Papa from 'papaparse';
import { importUpdateFile } from '../../store/actions';
import ImportStatus from '../ImportStatus/ImportStatus';
import ImportFile from './ImportFile/ImportFile';

function Import() {
    const dispatch = useDispatch();
    const updateStore = (name, parsedCsv) => {
        const updated = {
            [name]: {
                status: true,
                columns: parsedCsv.meta.fields,
                data: parsedCsv.data,
            },
        };
        dispatch(importUpdateFile(updated));
    };
    const [files, setFiles] = useState([]);

    const fieldsSchema = {
        user: ['Code_Inscrit', 'Nom', 'Prénom', 'Adresse1', 'Adresse2',
            'CP', 'Ville', 'Tél', 'Mail', 'Caution'],
        game: ['CodeJeu', 'NomJeu', 'DateAchat', 'Marque', 'TypeJeu', 'Descriptif1', 'PrixEstimé'],
        booking: ['CodeInscrit', 'Nom', 'DateSortie', 'NomJeu', 'CodeJeu', 'TypeJeu'],
        cost: ['CodeJeu', 'NomJeu', 'DateAchat', 'PrixAchat', 'PrixEstime', 'NomFournisseur'],
    };
    const readCSV = async (file) => new Promise((resolve) => {
        Papa.parse(file, {
            header: true,
            encoding: 'windows-1252',
            complete: (results) => {
                resolve(results);
            },
        });
    });

    const processFile = async (file) => {
        const processedFile = file;
        if (file.type === 'text/csv') {
            const result = await readCSV(file);
            const csvFields = result.meta.fields;
            const fileCategory = Object.keys(fieldsSchema).find((key) => (
                fieldsSchema[key].every((field) => csvFields.includes(field))));
            if (fileCategory) {
                updateStore(fileCategory, result);
                processedFile.status = 'valid';
            } else {
                processedFile.status = 'invalid';
            }
        } else {
            processedFile.status = 'invalid';
        }
        return processedFile;
    };

    const handleDropFiles = async (uploaded) => {
        //  Original upload for fast display
        setFiles(uploaded.map((file, index) => {
            const filePending = file;
            filePending.status = 'pending';
            filePending.delay = index;
            return filePending;
        }));
        //  File with type detection and csv Parsing
        const processedFiles = await Promise.all(uploaded.map((file) => processFile(file)));
        setFiles(processedFiles);
        //  Hide softly files
        setTimeout(() => {
            setFiles(processedFiles.map((file, index) => {
                const filePending = file;
                filePending.status = false;
                filePending.delay = index;
                return filePending;
            }));
        }, uploaded.length * 150);
        //  Delete files from state
        setTimeout(() => {
            setFiles([]);
        }, uploaded.length * 175);
    };

    return (
        <Container>
            <Dropzone onDrop={handleDropFiles}>
                {({ getRootProps, getInputProps }) => (
                    <section className={(!files.length) ? 'zone' : 'zone zone--padding'} {...(!files.length) && getRootProps()}>
                        {(!files.length)
                            ? (
                                <>
                                    <input {...getInputProps()} />
                                    <p>Déposez des fichiers ou cliquez ici.</p>
                                </>
                            )
                            : (
                                files.map((file) => (
                                    <ImportFile
                                        key={file.name}
                                        file={file}
                                        schemas={fieldsSchema}
                                    />
                                ))
                            )}
                    </section>
                )}
            </Dropzone>
            <ImportStatus />
            {/* <Papaparse /> */}
        </Container>

    );
}

export default React.memo(Import);
