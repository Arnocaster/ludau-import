/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import * as actions from '../actions';

const initialState = {
    user: {
        status: false,
        columns: null,
        data: null,
    },
    game: {
        status: false,
        columns: null,
        data: null,
    },
    booking: {
        status: false,
        columns: null,
        data: null,
    },
    cost: {
        status: false,
        columns: null,
        data: null,
    },

};

export function importReducer(state = initialState, action) {
    switch (action.type) {
    case actions.IMPORT_UPDATE_FILE:
        return { ...state, ...action.payload };
    default:
        return state;
    }
}
