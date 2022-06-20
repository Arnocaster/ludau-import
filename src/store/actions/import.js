/* eslint-disable import/prefer-default-export */

export const IMPORT_UPDATE_FILE = 'IMPORT_UPDATE_FILE';

export function importUpdateFile(obj) {
    return {
        type: IMPORT_UPDATE_FILE,
        payload: obj,
    };
}
