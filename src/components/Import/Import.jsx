/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import './import.scss';
import Dropzone from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button } from '@mui/material';
import Papa from 'papaparse';
import { importUpdateFile } from '../../store/actions';
import ImportStatus from '../ImportStatus/ImportStatus';
import ImportFile from './ImportFile/ImportFile';
// import Papaparse from '../Papaparse/Papaparse';

function Import() {
    const dispatch = useDispatch();
    const dataStore = useSelector((state) => state.importReducer);
    const handleClick = () => {
        const newData = {
            user: {
                status: 'true',
                columns: ['c1', 'c2'],
                data: ['r1', 'r2'],
            },
        };
        dispatch(importUpdateFile({ ...dataStore, ...newData }));
    };
    const [files, setFiles] = useState([]);

    const fieldsSchema = {
        user: ['Code_Inscrit', 'Nom', 'Prénom', 'Adresse1', 'Adresse2',
            'CP', 'Ville', 'Tél', 'Mail', 'Caution'],
        game: ['CodeJeu', 'NomJeu', 'DateAchat', 'Marque', 'TypeJeu', 'Descriptif1', 'PrixEstimé'],
        booking: ['CodeInscrit', 'Nom', 'DateSortie', 'NomJeu', 'CodeJeu', 'TypeJeu'],
        cost: ['CodeJeu', 'NomJeu', 'DateAchat', 'PrixAchat', 'PrixEstime', 'NomFournisseur'],
    };

    // Read and parse CSV
    const readCSV = async (file) => new Promise((resolve) => {
        Papa.parse(file, {
            header: true,
            encoding: 'windows-1252',
            complete: (results) => {
                resolve(results);
            },
        });
    });
    const updateEltStatus = (name) => {
        console.log(files.find((file) => file.data.name === name), files);
    };
    const processCSV = async (elts) => {
        await elts.forEach(async (file) => {
            const parsed = await readCSV(file);
            const csvFields = parsed.meta.fields;
            const fileCategory = Object.keys(fieldsSchema).find((key) => (
                fieldsSchema[key].every((field) => csvFields.includes(field))));
            console.log('fileCategory', fileCategory);
            updateEltStatus(file.name);
        });
    };

    const handleDropFiles = (uploaded) => {
        // set les files avec un status pending
        // Penser à vérifier le type

        const wrapStatus = uploaded.map((data) => {
            const eltWithStatus = {
                status: 'pending',
                data,
            };
            return eltWithStatus;
        });
        console.log(wrapStatus);
        setFiles(wrapStatus);
        console.log('after', files);
        processCSV(uploaded);
    };

    return (
        <Container>
            <Dropzone onDrop={handleDropFiles}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        {(!files.length)
                            ? (
                                <div className="zone" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Déposez des fichiers ou cliquez ici.</p>
                                </div>
                            )
                            : (
                                <div className="zone">
                                    {' '}
                                    {files.map((file) => (
                                        <ImportFile
                                            key={file.data.name}
                                            file={file}
                                        />
                                    ))}
                                </div>
                            )}
                    </section>
                )}
            </Dropzone>
            <Button onClick={handleClick}>TESTO</Button>
            <ImportStatus />
            {/* <Papaparse /> */}
        </Container>

    );
}

export default React.memo(Import);
