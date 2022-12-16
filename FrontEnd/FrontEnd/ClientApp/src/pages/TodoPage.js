import React, { Component } from 'react'
import { Header, Table, Menu, Icon, Button } from 'semantic-ui-react'
import { CategoryAPI, ElementAPI } from '../services'

class TodoPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'todo',
            TodoId: window.location.href.split("=")[1],
            categories: [],
            elements: [],
        }

        this.getCategoryId = this.getCategoryId.bind(this)
        this.getElementId = this.getElementId.bind(this)
    }

    componentDidMount() {
        this.getCategoryId()
        this.getElementId()
    }

    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }

    handleClose() {
        window.close()
    }

    async getCategoryId() {
        const { TodoId } = this.state
        let res = await CategoryAPI.getByTodoId(TodoId)
        this.setState({ categories: res.result })
    }
    async getElementId() {
        const { TodoId } = this.state
        let res = await ElementAPI.getByTodoId(TodoId)
        this.setState({ elements: res.result })
    }
    render() {
        const { activeItem, TodoId } = this.state
        const { categories } = this.state
        const { elements } = this.state
        return (
            <div className='todo-page'>
                <Menu pointing secondary className='menu-todo'>
                    <Button className='menu-item-close' inverted color='red' onClick={() => this.handleClose()}>Close</Button>
                    <Button className='save-todo' inverted color='green'>Save Todo</Button>
                    <Menu.Menu position='right' className='menu-todo'>
                        <Menu.Item
                        name='TodoName'
                        active={activeItem === 'TodoName'}
                        />

                    </Menu.Menu>
                </Menu>
                <div className='table-category-element'>
                    <div className='name-details'>
                        <Table className='table-category'>
                            <div>
                                {
                                    categories.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <p>{item.categoryName}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Table>
                    </div>
                    <div className='name-details-ele'>
                        <Table className='table-element'>
                            <div className='name-details-element'>
                                {
                                    elements.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <p>{item.elementName}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Table>
                    </div>
                </div>


            </div>
        );
    }
}
export default TodoPage;
