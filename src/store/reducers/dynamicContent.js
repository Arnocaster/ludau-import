/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import * as actions from '../actions';

const initialState = { width: 0, height: 0 };

export function dynamicContentReducer(state = initialState, action) {
    switch (action.type) {
    case actions.DYNAMIC_CONTENT_ADD_AROUND_SIZE:
        return { ...state, ...action.payload };
    default:
        return state;
    }
}
