import React, { Component } from 'react';
import { Label, Table, Button, Modal, Icon, Menu } from 'semantic-ui-react'
import { TodoAPI } from '../services'
import TodoModal from '../components/modals/todoModal'
import { Link } from 'react-router-dom';
import { NavMenu } from '../components/NavMenu';
import CreateTodo from '../components/creates/createTodo';
import CreateCategory from '../components/creates/createCategory';
import CategoryPage from './CategoryPage';
import { loadTodo, loadAddTodo, loadUpdateTodo, loadDeleteTodo } from '../redux/actions/actionTodo'
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     todos: []
        // }

        this.onCreateTodo = this.onCreateTodo.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.props.dispatch(loadTodo())
    }


    async componentDidMount() {

        const res = await TodoAPI.getTodos()

        this.setState({ todos: res.result || [] })

    }

    async onCreateTodo(todo) {
        // let { todos } = this.state
        // let res = await TodoAPI.createTodos(todo)
        // if (!res.error && res.result) {
        //     todos.push(res.result)
        //     this.setState({ todos: todos })
        // }
        this.props.dispatch(loadAddTodo(todo))
    }

    async onUpdate(newUpdateTodo) {
        // let { todos } = this.state
        // const id = currentTodo.id

        // let res = await TodoAPI.updateTodos(currentTodo, id)
        // if (res) {
        //     todos.forEach(todo => {
        //         if (todo.id === id) {
        //             todo.todoName = currentTodo.todoName
        //             todo.code = currentTodo.code
        //         }
        //     })
        //     this.setState({ todos: todos })
        // }
        this.props.dispatch(loadUpdateTodo(newUpdateTodo))
    }

    async onDelete(newDeleteTodo) {
        // const id = currentTodo.id
        // let res = await TodoAPI.deleteTodos(currentTodo, id)
        // this.setState({ todos: this.state.todos.filter(todos => todos.id !== id) })
        this.props.dispatch(loadDeleteTodo(newDeleteTodo))
    }

    render() {
        const { todos } = this.props
        return (
            <div className='table'>
                <NavMenu todos={todos} onCreateTodo={this.onCreateTodo} />
                <Table celled className='block'>
                    <Table.Header className='header-table'>
                        <Table.Row>
                            <Table.HeaderCell className='menu1'>Name</Table.HeaderCell>
                            <Table.HeaderCell className='menu'>Code</Table.HeaderCell>
                            <Table.HeaderCell className='menu'>CreateTime</Table.HeaderCell>
                            <Table.HeaderCell className='menu'></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            todos.map((item, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>
                                            <TodoModal todo={item} isCreate={false} onDelete={this.onDelete} onUpdate={this.onUpdate} />
                                        </Table.Cell>
                                        <Table.HeaderCell>
                                            <Label >{item.code}</Label>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <Label >{item.createdDate}</Label>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <Link target='_blank' to={`/Todo?todoId=${item.id}`}>Details</Link>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                )
                            }
                            )
                        }
                    </Table.Body>
                </Table>
            </div>
        )
    }
}



const mapStateToProps=(state)=>( {
    todos: state.todos.todos,
})


export default connect(mapStateToProps)(Home);