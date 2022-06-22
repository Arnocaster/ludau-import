/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import './import.scss';
import Dropzone from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import Papa from 'papaparse';
import { importUpdateFile } from '../../store/actions';
import ImportStatus from './ImportStatus/ImportStatus';
import ImportFile from './ImportFile/ImportFile';

function Import() {
    const dispatch = useDispatch();
    const statusStore = useSelector((state) => state.importReducer);
    const importOk = Object.keys(statusStore).every((key) => statusStore[key].status);
    const [displayDrop, setDisplayDrop] = useState(true);
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

    const resultIndexed = (oldResult) => {
        const oldData = oldResult.data;
        const newData = oldData.map((row, index) => ({ id: index, ...row }));
        return { ...oldResult, data: newData };
    };

    const processFile = async (file) => {
        const processedFile = file;
        if (file.type === 'text/csv') {
            const result = await readCSV(file);
            const csvFields = result.meta.fields;
            const fileCategory = Object.keys(fieldsSchema).find((key) => (
                fieldsSchema[key].every((field) => csvFields.includes(field))));
            if (fileCategory) {
                updateStore(fileCategory, resultIndexed(result));
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
        setTimeout(() => {
            setFiles([]);
        }, (uploaded.length * 150 > 1000) ? uploaded.length * 150 : 1000);
    };

    useEffect(() => {
        if (importOk !== displayDrop) {
            setTimeout(() => { setDisplayDrop(importOk); }, 750);
        }
    }, [importOk]);

    return (
        <Container className="import__container">
            {(!displayDrop)
                && (
                    <Dropzone onDrop={handleDropFiles}>
                        {({ getRootProps, getInputProps }) => (
                            <section className={(!files.length) ? 'import__zone' : 'import__zone import__zone--padding'} {...(!files.length) && getRootProps()}>
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
                ) }

            <Container>
                <ImportStatus />
            </Container>
            {/* <Papaparse /> */}
        </Container>

    );
}

export default React.memo(Import);
