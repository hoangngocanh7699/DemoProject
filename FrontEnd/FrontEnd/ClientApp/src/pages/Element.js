import { Component } from "react";
import { Modal, Button, Dropdown, Table, Icon } from 'semantic-ui-react'
import ElementModal from "../components/modals/elementModal";
import { ElementAPI, TodoAPI } from "../services";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { loadAddElement, loadDeleteElement, loadElement } from "../redux/actions/actionElement";
import { connect } from 'react-redux';
class ElementPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            todoOptions: [],
            element: []
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.loadElementFromTodoId = this.loadElementFromTodoId.bind(this);
        this.handleChangeTodo = this.handleChangeTodo.bind(this)
        this.onCreateElement = this.onCreateElement.bind(this)
        // this.handleDeleteElement = this.handleDeleteElement.bind(this)
        this.props.dispatch(loadElement())
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
    async loadElementFromTodoId(todoId) {
        let res = await ElementAPI.getByTodoId(todoId)
        let element = res.result || []
        this.setState({ element: element })
    }

    handleChangeTodo(event, data) {
        let todoId = data.value
        this.loadElementFromTodoId(todoId)
        this.setState({ todoIdDropdown: todoId })
    }
    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }

    async onCreateElement(element) {
        // const { element } = this.state
        // let res = await ElementAPI.createElement(elements)
        // if (res) {
        //     element.push(elements)
        //     this.setState({ element: element })
        // }
        this.props.dispatch(loadAddElement(element))
    }

    async onDelete(newDeleteElement) {
        this.props.dispatch(loadDeleteElement(newDeleteElement))
    }
    async handleDeleteElement(e, data) {
        let { currentTodo } = this.state
        this.handleOpen(false)
        this.onDelete(currentTodo)
        this.handleOpen(false)
    }
    submit = (elementId) => {
        this.handleOpen(false)
        confirmAlert({
            title: "Confirm to submit",
            message: "Do you want to delete ?",
            buttons: [
                {
                    label: "Delete",
                    onClick: (e) => {
                        // const data = document.getElementById('textbox_id');
                        // this.handleDeleteElement(e, data)
                        const payload = this.props.elements.find(item => item.id === elementId)
                        this.onDelete(payload)
                    }
                },
                {
                    label: "Cancel"
                }
            ]
        });
    };

    render() {
        const { isOpen } = this.state
        const { todoOptions, element } = this.state
        return (
            <div className="contain">
                <Modal.Actions className="action-category">
                    <ElementModal onCreateElement={this.onCreateElement} />
                    <Button className="close" as={Link} to="/" >Close</Button>
                </Modal.Actions>
                <Modal.Content>
                    <Dropdown
                        placeholder='Select Todo'
                        fluid
                        selection
                        options={todoOptions}
                        onChange={this.handleChangeTodo}
                    />
                </Modal.Content>
                <div className="contents">
                    {
                        element.map((item, index) => {
                            return (
                                <Table className="show-category" id='textbox_id'>
                                    <div className="boder-category" id={item.id} key={index}>{item.elementName}</div>
                                    <Button className="show-button" onClick={() => this.submit(item.id)} onDelete={this.submit}>X</Button>
                                </Table>

                            )
                        })
                    }
                </div>

            </div>

        )
    }
}
const mapStateToProps = (state) => ({
    elements: state.elements.elements,
})
export default connect(mapStateToProps)(ElementPage);