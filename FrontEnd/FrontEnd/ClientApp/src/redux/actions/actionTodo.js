import { TodoAPI } from '../../services'
import * as types from '../constant/actionTypes'


export const getTodo = todos => ({ type: types.GET_TODO, payload: todos })
export const getTodoById = todo => ({ type: types.GET_TODO_BYID, payload: todo })
export const addTodo = todo => ({ type: types.ADD_TODO, payload: todo })
export const deleteTodo = todo => ({ type: types.DELETE_TODO, payload: todo })
export const updateTodo = todo => ({ type: types.UPDATE_TODO, payload: todo })


export function loadTodo() {
    return async dispatch => {
        let reponsive = await TodoAPI.getTodos()
        dispatch(getTodo(reponsive.result))
    }
}

export function loadTodoById() {
    return async dispatch => {
        let reponsive = await TodoAPI.getById()
        dispatch(getTodoById(reponsive.result))
    }
}

export function loadAddTodo(todo) {
    return async dispatch => {
        let reponsive = await TodoAPI.createTodos(todo)
        dispatch(addTodo(reponsive.result))
    }
}

export function loadDeleteTodo(newDeleteTodo) {
    return async dispatch => {
        let reponsive = await TodoAPI.deleteTodos(newDeleteTodo, newDeleteTodo.id)
        if(reponsive) {
            dispatch(deleteTodo(newDeleteTodo))
        }
    }
}

export function loadUpdateTodo(newUpdateTodo) {
    return async dispatch => {
        let reponsive = await TodoAPI.updateTodos(newUpdateTodo, newUpdateTodo.id)
        if(reponsive) {
            dispatch(updateTodo(newUpdateTodo))
        }
        
    }
}