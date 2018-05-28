import {TODO_ADD} from './todoConstants'

export default (state = [], action) => {
    switch (action.type) {
        case TODO_ADD:
            return state.concat({
                id: state.length + 1,
                name: action.payload.name
            });
        default:
            return state;
    }
};
