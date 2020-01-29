import { User } from '../user.model';

export interface State {
    user: User;
}

const intialState = {
    user: null
};

export function authReducer(state = intialState, action) {
    return state;
}
