import { Component } from "react";
import { CategoryAPI, ElementAPI } from "../../services";
import { Modal, Button, Dropdown, Form, Input } from 'semantic-ui-react';
import { TodoAPI } from '../../services';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import DatePicker from 'react-datepicker'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

class ElementModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            element: [],
            currentElement: {},
            parentOptions: [],
            date: null,
            elementId: '',
            todoIdDropdown: ''
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleChangeTodo = this.handleChangeTodo.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.loadElementFromTodoId = this.loadElementFromTodoId.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateElement = this.handleCreateElement.bind(this);
        this.handleChangeCategoty = this.handleChangeCategoty.bind(this);
        // this.handleDeleteElement = this.handleDeleteElement.bind(this);
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
    async findParentOptions() {
        let newparentOptions = []
        let res = await ElementAPI.getElements()
        res.result.map((item, index) => {
            let id = item.id
            let text = item.elementName
            newparentOptions.push({
                key: index,
                text: text,
                value: id,
            })
            return newparentOptions
        })
        this.setState({ parentOptions: newparentOptions })
    }

    async loadElementFromTodoId(todoId) {
        let newparentOptions = []
        let res = await CategoryAPI.getByTodoId(todoId)
        let element = res.result || []
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
        this.setState({ element: newparentOptions })
    }

    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }
    handleChange(e, data) {
        let { currentElement } = this.state
        let name = data.name
        let value = data.value
        if (name === 'elementName') {
            currentElement.elementName = value
        } else if (name === 'elementDescription') {
            currentElement.description = value
        }
        this.setState({ currentElement: currentElement })
    }
    handleChangeTodo(event, data) {
        let todoId = data.value
        this.loadElementFromTodoId(todoId)
        this.setState({ todoIdDropdown: todoId })
    }

    async handleCreateElement() {
        let { currentElement, categoryId, todoIdDropdown } = this.state
        if (categoryId === '') {
            categoryId = null
        }
        let payload = {
            elementName: currentElement.elementName,
            description: currentElement.description,
            todoId: todoIdDropdown,
            parentId: categoryId
        }
        this.props.onCreateElement(payload)
        this.handleOpen(false)
    }
    // async handleDeleteElement(e, data) {
    //     let { currentElement } = this.state
    //     this.handleOpen(false)
    //     this.props.onDelete(currentElement)
    //     this.handleOpen(false)
    // }

    handleChangeDate(e, data) {
        this.setState({ date: data.value })
    }
    handleChangeCategoty(event, data) {
        let categoryId = data.value
        this.setState({ categoryId })
    }

    render() {
        const { isOpen, todoOptions, parentOptions, element } = this.state
        const { isCreate, currentElement } = this.state
        const userOptions = [
            { key: 'af', value: 'af', text: 'SimpleText' },
            { key: 'ax', value: 'ax', text: 'ComplextText' },
            { key: 'al', value: 'al', text: 'Date' },
            { key: 'dz', value: 'dz', text: 'Check Box' },
        ]
        return (
            <div>
                <Modal
                    className="create-element"
                    centered
                    open={isOpen}
                    onOpen={() => this.handleOpen(true)}
                    onClose={() => this.handleOpen(false)}
                    trigger={<Button className="add-element">Add</Button>}
                >
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Element Name</label>
                                <Input name='elementName' id="textbox_id" placeholder='Element Name' defaultValue={isCreate ? '' : currentElement.elementName} onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <Input name='elementDescription' placeholder='Description' onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <SemanticDatepicker onChange={this.handleChangeDate} />

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
                            options={element}
                            onChange={this.handleChangeCategoty}
                        />
                    </Modal.Content>
                    <Modal.Content>
                        <Dropdown
                            placeholder='Options'
                            fluid
                            selection
                            options={userOptions}
                        />
                    </Modal.Content>
                    <Modal.Actions className="action-category">
                        <Button className="create" onClick={() => this.handleCreateElement()} >Create</Button>
                        <Button className="close" onClick={() => this.handleOpen(false)}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default ElementModal