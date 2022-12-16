import { ElementAPI } from '../../services'
import * as types from '../constant/actionTypes'

export const getElement = elements => ({ type: types.GET_ELEMENT, payload: elements })
export const getElementByTodoId = element => ({ type: types.GET_ELEMENT_BY_TODOID, payload: element })
export const addElement = element => ({ type: types.ADD_ELEMENT, payload: element })
export const deleteElement = element => ({ type: types.DELETE_ELEMENT, payload: element })


export function loadElement() {
    return async dispatch => {
        let reponsive = await ElementAPI.getElements()
        dispatch(getElement(reponsive.result))
    }
}

export function loadElementByTodoId() {
    return async dispatch => {
        let reponsive = await ElementAPI.getByTodoId()
        dispatch(getElementByTodoId(reponsive.result))
    }
}

export function loadAddElement(element) {
    return async dispatch => {
        let reponsive = await ElementAPI.createElement(element)
        dispatch(addElement(element))
    }
}

export function loadDeleteElement(newDeleteElement) {
    return async dispatch => {
        let reponsive = await ElementAPI.deleteElements(newDeleteElement, newDeleteElement.id)
        if(reponsive) {
            dispatch(deleteElement(newDeleteElement))
        }
    }
}

