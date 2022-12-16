import { Component } from "react";
import { Modal, Button, Form, Input, Item } from 'semantic-ui-react'
import { TodoAPI } from '../../services'




class CreateTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            collapsed: true,
            currentTodo:  {}
        };
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCreateTodo = this.handleCreateTodo.bind(this)
    }


    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }

    handleChange(e, data) {
        let { currentTodo } = this.state
        let name = data.name
        let value = data.value
        if (name === 'todoName') {
            currentTodo.todoName = value
        } else if (name === 'todoCode') {
            currentTodo.code = value
        }
        this.setState({ currentTodo: currentTodo })
    }
    
    handleCreateTodo() {
        let {currentTodo} = this.state
        this.props.onCreateTodo(currentTodo)
        this.handleOpen(false)
    }

    render() {
        const { isOpen } = this.state
        return (
            <div>
                <Modal
                    className="create-todo"
                    centered
                    open={isOpen}
                    onOpen={() => this.handleOpen(true)}
                    onClose={() => this.handleOpen(false)}
                    trigger={<Button className="button-create-todo">Create Todo</Button>}
                >
                    <Modal.Header>Create Todo</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Todo Name</label>
                                <Input name='todoName' id="textbox_id" placeholder='Todo Name' onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Code</label>
                                <Input name='todoCode' placeholder='Todo Code' onChange={this.handleChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="create" onClick={()=>this.handleCreateTodo()}>Create</Button>
                        <Button className="close" onClick={() => this.handleOpen(false)}>Close</Button>
                    </Modal.Actions>
                </Modal>
            </div>

        )
    }
}

export default CreateTodo