import Todo from './todoAPI'
import Category from './categoryAPI'
import Element from './elementAPI'

export const TodoAPI = new Todo()
export const CategoryAPI = new Category()
export const ElementAPI = new Element()




export default {
  TodoAPI,
  CategoryAPI,
  ElementAPI
}
