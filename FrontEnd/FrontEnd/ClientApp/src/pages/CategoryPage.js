import { Component } from "react";
import { CategoryAPI, TodoAPI } from "../services";
import { Label, Table, Button, Dropdown, Input, Icon } from 'semantic-ui-react'
import CategoryModal from "../components/modals/categoryModal";
import CreateCategory from "../components/creates/createCategory";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { loadAddCategory, loadCategory, loadDeleteCategory } from "../redux/actions/actionCategory";
import { connect } from 'react-redux';

class CategoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            currentTodo: {},
            todoOptions: [],
            cates: [],
            todoIdDropdown: '',
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.loadCategoryFromTodoId = this.loadCategoryFromTodoId.bind(this);
        this.handleChangeTodo = this.handleChangeTodo.bind(this)
        this.onCreateCategory = this.onCreateCategory.bind(this)
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this)
        this.props.dispatch(loadCategory())
    }
    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }

    componentDidMount() {
        this.findTodoOptions()
    }

    async findTodoOptions() {
        let newtodoOptions = []
        let res = await TodoAPI.getTodos()
        res.result.map((item, index) => {
            let text = item.todoName
            let id = item.id
            newtodoOptions.push({
                key: index,
                text: text,
                value: id,
            })
            return newtodoOptions
        })
        this.setState({ todoOptions: newtodoOptions })
    }

    async loadCategoryFromTodoId(todoId) {
        let res = await CategoryAPI.getByTodoId(todoId)
        let cates = res.result || []
        this.setState({ cates: cates })
    }

    handleChangeTodo(event, data) {
        let todoId = data.value
        this.loadCategoryFromTodoId(todoId)
        this.setState({ todoIdDropdown: todoId })
    }

    async onCreateCategory(category) {
        // const { cates } = this.state
        // let res = await CategoryAPI.createCategory(cate)
        // if (res) {
        //     cates.push(cate)
        //     this.setState({ cates: cates })
            
        // }
        this.props.dispatch(loadAddCategory(category))
    }
    
    async handleDeleteCategory(e, data){
        let { currentTodo } = this.state
        this.handleOpen(false)
        this.onDelete(currentTodo)
        this.handleOpen(false)
    }
    async onDelete(newDeleteCategory) {
        // const id = currentTodo.id
        // let res = await CategoryAPI.deleteCategogys(currentTodo, id)
        // this.setState({ cates: this.state.cates.filter(cates => cates.id !== id) })
        this.props.dispatch(loadDeleteCategory(newDeleteCategory))
    }
    
    submit = (categoryId) => {
        console.log(categoryId);
        this.handleOpen(false)
        confirmAlert({
          title: "Confirm to submit",
          message: "Do you want to delete ?",
          buttons: [
            {
              label: "Delete",
              onClick: (e) => {
                // const data = document.getElementsByClassName('show-category');
                // this.handleDeleteCategory(e, data)
                const payload = this.props.categories.find(item => item.id === categoryId)
                this.onDelete(payload)
            }
            },
            {
              label: "Cancel"
              // onClick: () => alert("Click No")
            }
          ]
        });
      };
    render() {
        const { isOpen, todoOptions, cates } = this.state
        return (
            <div className="contain">
                <div className="action-category">
                    <CategoryModal onCreateCategory={this.onCreateCategory} />
                    <Button className='close' as={Link} to="/">Close</Button>
                </div>
                <div className="filter-dropdown">
                    <Dropdown
                        placeholder='Select Todo'
                        fluid
                        selection
                        options={todoOptions}
                        onChange={this.handleChangeTodo}
                    />
                </div>

                <div className="contents">
                    {
                        cates.map((item, index) => {
                            return (
                                <Table className="show-category" id='textbox_id'>
                                    <div className="boder-category" id={item.id} key={index}>{item.categoryName}</div>
                                    <Button className="show-button" onClick={() => this.submit(item.id)} onDelete={this.onDelete}>X</Button>
                                </Table>
                            )
                        })
                    }
                </div>


            </div>
        )

    }

}
const mapStateToProps=(state)=>( {
    categories: state.categories.categories,
})

export default connect(mapStateToProps)(CategoryPage);