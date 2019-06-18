import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            del_user: "",
            up_nid: "",
            up_status: "",
            col_att: "",
            join_att: "",
            cat_att: ""
        }
        this.deleteUserHandler = this.deleteUserHandler.bind(this)
        this.nidHandler = this.nidHandler.bind(this)
        this.statusHandler = this.statusHandler.bind(this)
        this.attributeHandler = this.attributeHandler.bind(this)
        this.joinHandler = this.joinHandler.bind(this)
        this.categoryHandler = this.categoryHandler.bind(this)
    }

    deleteUserHandler(e){
        this.setState({
            ...this.state,
            del_user: e.target.value
        })
    }

    nidHandler(e) {
        this.setState({
            ...this.state,
            up_nid: e.target.value
        })
    }

    statusHandler(e) {
        this.setState({
            ...this.state,
            up_status: e.target.value
        })
    }

    attributeHandler(e) {
        this.setState({
            ...this.state,
            col_att: e.target.value
        })
    }

    joinHandler(e) {
        this.setState({
            ...this.state,
            join_att: e.target.value
        })
    }

    categoryHandler(e) {
        this.setState({
            ...this.state,
            cat_att: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Form>
                    <h3>Delete a user</h3>
                    <Form.Group widths='equal'>
                        <Form.Input 
                        fluid 
                        label='Username' 
                        placeholder='Username' 
                        onChange={this.deleteUserHandler}
                        value={this.state.del_user}/>
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                </Form>

                <Form>
                    <h3>Update a necessity status</h3>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid label='choose a necessity id to update'
                            placeholder='necessity id' 
                            onChange={this.nidHandler}
                            value={this.state.up_nid}/>
                        <Form.Input
                            fluid label='choose the new status'
                            placeholder='new status' 
                            onChange={this.statusHandler}
                            value={this.state.up_status}/>
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                </Form>


                <Form>
                    <h3>Query necessities by some column attribute</h3>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid label='what would you like to know about the necessities? (eg, status, name, etc)'
                            placeholder='dimension' 
                            onChange={this.attributeHandler}
                            value={this.state.col_att}/>
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                </Form>

                <Form>
                    <h3>Query necessities along side other attributes (join)</h3>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid label='choose one other table to join necessities with'
                            placeholder='dimension' 
                            onChange={this.joinHandler}
                            value={this.state.join_att}/>
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                </Form>

                <Form>
                    <h3>GroupBy - Find Users grouped by some category</h3>
                    <Form.Group widths='equal'>
                        <Form.Input 
                        fluid 
                        label='Category'
                         placeholder='Category'
                         onChange={this.categoryHandler}
                        value={this.state.cat_att} />
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                </Form>
            </div>
        );
    }
}

export default Admin;
