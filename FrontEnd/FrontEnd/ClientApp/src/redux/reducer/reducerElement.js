import {
    GET_ELEMENT,
    GET_ELEMENT_BY_TODOID,
    ADD_ELEMENT,
    DELETE_ELEMENT,
} from '../constant/actionTypes'

const initState = {
    elements: [],
    // element: {}
}

export default function reducerElement(state = initState, action) {
    switch(action.type){
        case GET_ELEMENT:
            return { elements: action.payload }
        case GET_ELEMENT_BY_TODOID:
            return { element: action.payload }
        case ADD_ELEMENT:
            let element = action.payload
            return { elements: [...state.elements, element]}
        case DELETE_ELEMENT:
            let newDeleteElement = action.payload
            let newDelElements = state.elements.filter(element => element.id !== newDeleteElement.id)
            return { elements: newDelElements}
        default: 
            return state
    }
} 