import { Component } from "react";
import { Button } from 'semantic-ui-react'


class DeleteCategory extends Component {
    constructor(props) {
        super(props)

    }
    async handleDeleteCategory(e, data){
        // let { currentTodo } = this.state
        // const {cates} = this.state
        // let res = await CategoryAPI.deleteCategogys(data)
        // this.props.onDelete(currentTodo)
        // this.handleOpen(false)
        
        // this.setState({ cates: cates.filter(cate => cate.id !== data.id) })
        // this.handleOpen(false)
        let { currentTodo } = this.state
        this.handleOpen(false)
        this.props.onDelete(currentTodo)
        this.handleOpen(false)
    }
    render(){
        return(
            <div>
                <Button className="show-button" onClick={this.submit}>X</Button>
            </div>
        )
    }
}

export default DeleteCategory