import { CategoryAPI } from '../../services'
import * as types from '../constant/actionTypes'

export const getCategory = categories => ({ type: types.GET_CATEGORY, payload: categories })
export const getCategoryByTodoId = category => ({ type: types.GET_CATEGORY_BY_TODOID, payload: category })
export const addCategory = category => ({ type: types.ADD_CATEGORY, payload: category })
export const deleteCategory = category => ({ type: types.DELETE_CATEGORY, payload: category })


export function loadCategory() {
    return async dispatch => {
        let reponsive = await CategoryAPI.getCategorys()
        dispatch(getCategory(reponsive.result))
    }
}

export function loadCategoryByTodoId() {
    return async dispatch => {
        let reponsive = await CategoryAPI.getByTodoId()
        dispatch(getCategoryByTodoId(reponsive.result))
    }
}

export function loadAddCategory(category) {
    console.log(category)
    return async dispatch => {
        let reponsive = await CategoryAPI.createCategory(category)
        dispatch(addCategory(category))
    }
}

export function loadDeleteCategory(newDeleteCategory) {
    return async dispatch => {
        let reponsive = await CategoryAPI.deleteCategogys(newDeleteCategory, newDeleteCategory.id)
        if(reponsive) {
            dispatch(deleteCategory(newDeleteCategory))
        }
    }
}

