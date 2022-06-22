/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './customDatagrid.scss';
import { Container } from '@mui/material';
import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid';

function CustomDatagrid({ schemas, data }) {
    // Responsive
    const [height, setHeight] = useState(null);
    const parentSize = useCallback((node) => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    }, []);

    const rows2 = [
        {
            id: 0, CodeJeu: '1', NomJeu: '1,2,3 je compte', Emplacement: '',
        },
        {
            id: 1,
        },

    ];

    const columns2 = [
        {
            type: undefined, field: 'id', headerName: 'id', width: 50,
        },
        {
            type: undefined, field: 'CodeJeu', headerName: 'Article_id', width: 150,
        },
        {
            type: undefined, field: 'NomJeu', headerName: 'name', width: 150,
        },
    ];

    const cleanRows = (newData) => {
        const cleaned = Object.keys(schemas).map((table) => {
            const dataTable = newData[table].data;
            const cleanedTable = dataTable.map((row) => {
                const filteredRow = Object.entries(row)
                    .filter(([field]) => Object.keys(schemas[table]).includes(field));

                return Object.fromEntries(filteredRow);
            });
            return cleanedTable;
        });
        return cleaned[0];
    };

    const columnBuilder = (schemasStruct) => Object.keys(schemasStruct).map((table) => {
        const tableFields = schemasStruct[table];
        return Object.keys(tableFields).map((prop) => {
            const current = tableFields[prop];
            const col = {
                type: current.type,
                field: prop,
                headerName: current.label,
                width: current.width,
            };
            return col;
        });
    })[0];

    const rows = cleanRows(data);
    const columns = columnBuilder(schemas);

    return (
        <div className="datagrid__availableSpace" ref={parentSize}>
            <Container style={{ height: height - 150 || 200, width: '100%' }} className="datagrid__container">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    GridColDef="center"
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Container>
        </div>
    );
}

CustomDatagrid.propTypes = {
    schemas: PropTypes.oneOfType([
        PropTypes.arrayOf([
            PropTypes.shape([
                PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                    PropTypes.bool,
                    PropTypes.func]),
            ]),
        ]),
        PropTypes.shape([
            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.bool,
                PropTypes.func]),
        ]),
    ]).isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf([
            PropTypes.shape([
                PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                    PropTypes.bool,
                    PropTypes.func]),
            ]),
        ]),
        PropTypes.shape([
            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.bool,
                PropTypes.func]),
        ]),
    ]).isRequired,
};

export default React.memo(CustomDatagrid);
