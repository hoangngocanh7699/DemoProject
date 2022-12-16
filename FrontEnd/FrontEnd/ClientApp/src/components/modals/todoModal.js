import React, { Component } from 'react'
import { Modal, Button, Form, Input } from 'semantic-ui-react'
import "react-confirm-alert/src/react-confirm-alert.css";
import { TodoAPI } from '../../services'
import { confirmAlert } from "react-confirm-alert";
import { loadDeleteTodo, loadTodo } from '../../redux/actions/actionTodo';
import { connect } from 'react-redux';

class TodoModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            currentTodo: Object.assign({}, props.todo)

        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdateTodo = this.handleUpdateTodo.bind(this)
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
    }
    

    componentWillReceiveProps(nextProps) {

        if (this.state.currentTodo !== nextProps.todo) {

            this.setState({

                currentTodo: Object.assign({}, nextProps.todo)

            })

        }

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


    async handleUpdateTodo(e, data) {
        let { currentTodo } = this.state
        this.props.onUpdate(currentTodo)
        this.handleOpen(false)
    }

    async handleDeleteTodo() {
        let { currentTodo } = this.state
        this.handleOpen(false)
        this.props.onDelete(currentTodo)
        this.handleOpen(false)
    }

    submit = () => {this.handleOpen(false)
        confirmAlert({
          title: "Confirm to submit",
          message: "Do you want to delete ?",
          buttons: [
            {
              label: "Delete",
              onClick: (e) => {
                const data = document.getElementById('textbox_id');
                this.handleDeleteTodo(e, data)
            }
            },
            {
              label: "Cancel"
            }
          ]
        });
      };
    
    render() {
        const { isCreate, todo } = this.props
        const { isOpen, currentTodo } = this.state
        
        return (
            <Modal
                className='details-modal full-heigh'
                centered
                open={isOpen}
                onOpen={() => this.handleOpen(true)}
                onClose={() => this.handleOpen(false)}
                trigger={<Button className='todo-name' content={isCreate ? 'Create Todo' : todo.todoName} />}
            >
                <Modal.Header>{todo.todoName}</Modal.Header>
                <Modal.Content>
                    <Form className='form-model'>
                        <Form.Field>
                            <label>Todo Name</label>
                            <Input name='todoName' id="textbox_id" placeholder='Todo Name' defaultValue={isCreate ? '' : currentTodo.todoName} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Code</label>
                            <Input name='todoCode' placeholder='Todo Code' defaultValue={isCreate ? '' : currentTodo.code} onChange={this.handleChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button className='update' onClick={(e) => {
                        const data = document.getElementById('textbox_id').value;
                        this.handleUpdateTodo(e, data)
                    }}>Update</Button>
                    <Button className='delete' onClick={this.submit}>Delete</Button>
                    <Button className='close' onClick={() => this.handleOpen(false)}>Close</Button>

                </Modal.Actions>
            </Modal >
        )
    }
}
export default TodoModal
