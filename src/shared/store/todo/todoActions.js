import {TODO_ADD} from './todoConstants'

export const addTodo = (name) => ({
    type: TODO_ADD,
    payload: { name }
});
