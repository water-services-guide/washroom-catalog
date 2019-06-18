import React, { Component } from 'react';
import { Form, Grid } from 'semantic-ui-react'
import { deleteUser, updateNecessityStatus, projectNecessityAttribute, getAllAverageUserRatings, join } from './admin-api-client'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            del_user: "",
            up_nid: "",
            up_status: "",
            col_att: "",
            join_att: "",
            cat_att: "",
            data: [],
            columns: []
        }

        this.deleteUserHandler = this.deleteUserHandler.bind(this)
        this.nidHandler = this.nidHandler.bind(this)
        this.statusHandler = this.statusHandler.bind(this)
        this.attributeHandler = this.attributeHandler.bind(this)
        this.joinHandler = this.joinHandler.bind(this)
        this.categoryHandler = this.categoryHandler.bind(this)
        this.onSubmitDelete = this.onSubmitDelete.bind(this)
        this.onSubmitUpdateNecessity = this.onSubmitUpdateNecessity.bind(this)
        this.onSubmitProjection = this.onSubmitProjection.bind(this)
        this.onSubmitCategories = this.onSubmitCategories.bind(this)
        this.onSubmitJoin = this.onSubmitJoin.bind(this)
    }

    deleteUserHandler(e) {
        this.setState({
            ...this.state,
            del_user: e.target.value
        })
    }

    onSubmitDelete(e, o) {
        console.log('click?')
        deleteUser(this.state.del_user)
        this.setState({
            ...this.state,
            del_user: ""
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

    onSubmitUpdateNecessity(e, o) {
        console.log("update necessity status?????")
        const { up_nid, up_status } = this.state
        updateNecessityStatus(up_nid, up_status)
        this.setState({
            ...this.state,
            up_nid: "",
            up_status: ""
        })
    }

    attributeHandler(e) {
        this.setState({
            ...this.state,
            col_att: e.target.value
        })
    }

    // updates table state
    async onSubmitProjection(e, o) {
        let result = await projectNecessityAttribute(this.state.col_att)
        let cols = []
        if (result.length > 0) {
            cols = this.getColumnHeaders(result)
        }
        this.setState({
            ...this.state,
            col_att: "",
            data: result,
            columns: cols
        })
    }

    joinHandler(e) {
        this.setState({
            ...this.state,
            join_att: e.target.value
        })
    }

    // updates table state
    async onSubmitJoin(e, o) {
        let result = await join(this.state.join_att)
        let cols = []
        if (result.length > 0) {
            cols = this.getColumnHeaders(result)
        }
        this.setState({
            ...this.state,
            join_att: "",
            data: result,
            columns: cols
        })
    }

    categoryHandler(e) {
        this.setState({
            ...this.state,
            cat_att: e.target.value
        })
    }

    // updates table state
    async onSubmitCategories(e, o) {
        let result = await getAllAverageUserRatings(this.state.cat_att)
        let cols = []
        if (result.length > 0) {
            cols = this.getColumnHeaders(result)
        }
        this.setState({
            ...this.state,
            cat_att: "",
            data: result,
            columns: cols
        })
    }


    getColumnHeaders(result) {
        let headers = []
        result = result[0]
        const keys = Object.keys(result)
        for(let i of keys ) {
            headers.push({Header: i, accessor: i})
        }
        return headers;
    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column floated='left' width={6}>


                        <Form>
                            <h3>Delete a user</h3>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Username'
                                    placeholder='Username'
                                    onChange={this.deleteUserHandler}
                                    value={this.state.del_user} />
                            </Form.Group>
                            <Form.Button onClick={this.onSubmitDelete}>Submit</Form.Button>
                        </Form>

                        <Form>
                            <h3>Update a necessity status</h3>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid label='choose a necessity id to update'
                                    placeholder='necessity id'
                                    onChange={this.nidHandler}
                                    value={this.state.up_nid} />
                                <Form.Input
                                    fluid label='choose the new status'
                                    placeholder='new status'
                                    onChange={this.statusHandler}
                                    value={this.state.up_status} />
                            </Form.Group>
                            <Form.Button onClick={this.onSubmitUpdateNecessity}>Submit</Form.Button>
                        </Form>


                        <Form>
                            <h3>Query necessities by some column attribute</h3>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid label='what would you like to know about the necessities? (eg, status, name, etc)'
                                    placeholder='dimension'
                                    onChange={this.attributeHandler}
                                    value={this.state.col_att} />
                            </Form.Group>
                            <Form.Button onClick={this.onSubmitProjection}>Submit</Form.Button>
                        </Form>

                        <Form>
                            <h3>Query necessities along side other attributes (join)</h3>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid label='choose one other table to join necessities with'
                                    placeholder='dimension'
                                    onChange={this.joinHandler}
                                    value={this.state.join_att} />
                            </Form.Group>
                            <Form.Button onClick={this.onSubmitJoin}>Submit</Form.Button>
                        </Form>

                        <Form>
                            <h3>GroupBy - Average necessity ratings grouped by user</h3>
                            <Form.Group widths='equal'>
                            </Form.Group>
                            <Form.Button onClick={this.onSubmitCategories}>Submit</Form.Button>
                        </Form>




                    </Grid.Column>
                    <Grid.Column floated='left' width={4}>
                        <ReactTable
                            data={this.state.data}
                            columns={this.state.columns}
                            showPagination={false}
                            minRows={6}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Admin;
