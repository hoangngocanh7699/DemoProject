import { Component, createElement } from "react";
import { TodoAPI } from '../../services'
import { Modal, Button, Dropdown} from 'semantic-ui-react'
class CreateElement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            todoOptions: []
        }
    }
    componentDidMount () {
        this.findTodoOptions()
    }
    async findTodoOptions(){
        let newtodoOptions = []
        let res = await TodoAPI.getTodos()
        res.result.map((item,index) => {
            let text = item.todoName
            let id = item.id
            newtodoOptions.push({
                key: index,
                text: text,
                value: id,
            })
            return newtodoOptions
        })
        this.setState({todoOptions:newtodoOptions})
    }

    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }
    handleCreateElement() {
        let { currentTodo } = this.state
        this.handleOpen(false)
    }

    render() {
        const { isOpen } = this.state
        const { todoOptions } = this.state
        return (
            <div>
                <Modal
                    className="create-category"
                    centered
                    open={isOpen}
                    onOpen={() => this.handleOpen(true)}
                    onClose={() => this.handleOpen(false)}
                    trigger={<Button>Element</Button>}
                >
                    <Modal.Actions className="action-category">
                        <Button className="create" onClick={() => this.handleCreateElement()}>Add</Button>
                        <Button className="close" onClick={() => this.handleOpen(false)}>Close</Button>
                    </Modal.Actions>
                    <Modal.Content>
                    <Dropdown
                            placeholder='Select Todo'
                            fluid
                            selection
                            options={todoOptions}
                        />
                    </Modal.Content>

                </Modal>
            </div>
        )
    }
}

export default CreateElement