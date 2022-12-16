
import {
    GET_CATEGORY,
    GET_CATEGORY_BY_TODOID,
    ADD_CATEGORY,
    DELETE_CATEGORY,
} from '../constant/actionTypes'

const initState = {
    categories: [],
    //category: {}
}

export default function reducerCategory (state = initState, action) {
    switch(action.type) {
        case GET_CATEGORY:
            return { categories: action.payload }
        case GET_CATEGORY_BY_TODOID:
            return { category: action.payload }
        case ADD_CATEGORY:
            let category = action.payload
            return { categories: [...state.categories, category]}
        case DELETE_CATEGORY:
            let newDeleteCategory = action.payload 
            let newDelCategories = state.categories.filter(category => category.id !== newDeleteCategory.id)
            return { categories: newDelCategories, ...state.categories}
        default:
            return state
    }
}