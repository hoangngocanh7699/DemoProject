import { Component } from "react";
import { Modal, Button, Dropdown, Form, Input } from 'semantic-ui-react'
import CreateCategory from "../creates/createCategory";
import { CategoryAPI, TodoAPI } from '../../services';

class CategoryModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            cates: [],
            parentOptions: [],
            currentCategory:{},
            todoIdDropdown:'',
            categoryId:'',
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleChangeTodo = this.handleChangeTodo.bind(this)
        this.loadCategoryFromTodoId = this.loadCategoryFromTodoId.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }
    componentDidMount() {
        this.findTodoOptions()
        this.findParentOptions()
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
    async findParentOptions(){
        let newparentOptions = []
        let res = await CategoryAPI.getCategorys()
        res.result.map((item, index) => {
            let id = item.id
            let text = item.categoryName
            newparentOptions.push({
                key: index,
                text: text,
                value: id,
            })
            return newparentOptions
        })
        this.setState({ parentOptions : newparentOptions })
    }

    async loadCategoryFromTodoId(todoId) {
        let newparentOptions = []
        let res = await CategoryAPI.getByTodoId(todoId)
        let cates = res.result || []
        res.result.map((item, index) => {
            let id = item.id
            let text = item.categoryName
            newparentOptions.push({
                key: index,
                text: text,
                value: id,
            })
            return newparentOptions
        })
        this.setState({ cates: newparentOptions })
    }
    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }
    handleChange(e, data) {
        let { currentCategory } = this.state
        let name = data.name
        let value = data.value
        if (name === 'categoryName') {
            currentCategory.categoryName = value
        } else if (name === 'categoryCode') {
            currentCategory.code = value
        }
        this.setState({ currentCategory: currentCategory })
    }
    handleChangeTodo(event, data) {
        let todoId = data.value
        this.loadCategoryFromTodoId(todoId)
        this.setState({ todoIdDropdown: todoId })
    }
    async handleCreateCategory() {
        let { currentCategory, categoryId, todoIdDropdown} = this.state
        if(categoryId === ''){
            categoryId = null
        }
        let payload = {
            categoryName: currentCategory.categoryName,
            code: currentCategory.code,
            todoId: todoIdDropdown,
            parentId: categoryId
        }
        this.props.onCreateCategory(payload)
        this.handleOpen(false)
    }
    handleChangeCategory(event, data) {
        let categoryId = data.value
        this.setState({ categoryId })
    }
    
    render() {
        const { isOpen, todoOptions, parentOptions, cates } = this.state
        const { isCreate,currentCategory } = this.state
        return (
            <div>
                <Modal
                    className="create-category"
                    centered
                    open={isOpen}
                    onOpen={() => this.handleOpen(true)}
                    onClose={() => this.handleOpen(false)}
                    trigger={<Button className="add-category">Add</Button>}
                >
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Category Name</label>
                                <Input name='categoryName' id="textbox_id" placeholder='Category Name' defaultValue={isCreate ? '' : currentCategory.categoryName} onChange={this.handleChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Code</label>
                                <Input name='categoryCode' placeholder='Todo Code' onChange={this.handleChange}  />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Content>
                        <Dropdown
                            placeholder='Select Todo'
                            fluid
                            selection
                            options={todoOptions}
                            onChange={this.handleChangeTodo}
                        />
                    </Modal.Content>
                    <Modal.Content>
                        <Dropdown
                            placeholder='Select Parent'
                            fluid
                            selection
                            options={cates}
                            onChange = {this.handleChangeCategory}
                        />
                    </Modal.Content>
                    <Modal.Actions className="action-category">
                        <Button className="create" onClick={() => this.handleCreateCategory()} >Create</Button>
                        <Button className="close" onClick={() => this.handleOpen(false)}>Cancel</Button>
                    </Modal.Actions>
                </Modal>

            </div>
        )
    }
}

export default CategoryModal