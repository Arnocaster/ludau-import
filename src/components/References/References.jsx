/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './references.scss';
import { useSelector } from 'react-redux';
import CustomDatagrid from '../CustomDatagrid/CustomDatagrid';
import referencesDatagridSchema from './referencesDatagridSchema';

function References() {
    const dataStore = useSelector((state) => state.importReducer);
    const [data, setData] = useState();

    // const getData = () => {
    //     console.log(data, setData);
    // };

    useEffect(() => {
        setData(dataStore);
    }, []);

    // Process Data

    return (
        <div className="references">
            {data
            && (
                <CustomDatagrid
                    schemas={referencesDatagridSchema}
                    data={data}
                    rowId="CodeJeu"
                />
            )}
        </div>
    );
}

export default React.memo(References);
