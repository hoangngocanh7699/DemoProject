import { combineReducers } from 'redux'
import reducerCategory from './reducerCategory';
import reducerElement from './reducerElement';
import reducerTodo from './reducerTodo';

const rootReducer = combineReducers ({
    todos: reducerTodo,
    categories: reducerCategory,
    elements: reducerElement
})

export default rootReducer;