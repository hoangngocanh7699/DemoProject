import {
    GET_TODO,
    GET_TODO_BYID,
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO
} from '../constant/actionTypes'

const initState = 
    {
        todos: [],
        todo: {}
    }

export default function reducerTodo(state = initState, action) {
    switch (action.type) {
        case GET_TODO:
            return {todos: action.payload}
        case GET_TODO_BYID:
            return {todo: action.payload}
        case ADD_TODO:
            let todo = action.payload
            return { todos: [...state.todos, todo]}
        case DELETE_TODO:
            let newDeleteTodo = action.payload 
            let newDelTodos = state.todos.filter(todo => todo.id !== newDeleteTodo.id)
            return { todos: newDelTodos}
        case UPDATE_TODO:
            let newUpdateTodo = action.payload
            let newUpdate = state.todos.findIndex((todos) => todos.id === newUpdateTodo.id)
            state.todos[newUpdate] = newUpdateTodo
            return { todos: [...state.todos]}
        default:
            return state
    }
}

