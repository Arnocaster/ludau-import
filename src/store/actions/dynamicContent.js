/* eslint-disable import/prefer-default-export */

export const DYNAMIC_CONTENT_ADD_AROUND_SIZE = 'DYNAMIC_CONTENT_ADD_AROUND_SIZE';

export function addAroundSize(obj) {
    return {
        type: DYNAMIC_CONTENT_ADD_AROUND_SIZE,
        payload: obj,
    };
}
