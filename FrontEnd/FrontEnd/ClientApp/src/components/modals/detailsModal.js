import React, { Component } from 'react'
import { Modal, Form, Button, Input } from 'semantic-ui-react'
import TodoAPI from '../../services/todoAPI'

class DetailsModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
        };
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }

    handleChange(e, data) {
        let { currentTodo } = this.state
        let name = data.name
        let value = data.value
        
        this.setState({ currentTodo: currentTodo })
    }


    async handleUpdateTodo(id) {
        let { currentTodo } = this.state
        let res = await TodoAPI.updateTodos('',id)
        if (res) {
            this.setState({ currentTodo: currentTodo })
            this.handleOpen(false)
        }
    }


    render() {
        const { isOpen, todo } = this.state
        return (
            <div>
                <Modal >
                    <Modal.Header>Create Todo</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>{todo.todoName}</label>
                                <Input name='todoName' id="textbox_id" placeholder='Todo Name' onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Code</label>
                                <Input name='todoCode' placeholder='Todo Code' onChange={this.handleChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="create" onClick={() => this.handleUpdateTodo()}>Add</Button>
                        <Button className="close" onClick={() => this.handleOpen(false)}>Close</Button>
                    </Modal.Actions>
                </Modal>
            </div>

        )
    }
}

export default DetailsModal