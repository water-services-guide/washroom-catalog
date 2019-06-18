import React, { Component } from 'react';
import { Form, Segment, Grid, Divider } from 'semantic-ui-react'
import { deleteUser, updateNecessityStatus, projectNecessityAttribute, getAllAverageUserRatings, join } from './admin-api-client'

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

    onSubmitProjection(e, o) {
        projectNecessityAttribute(this.state.col_att)
        this.setState({
            ...this.state,
            col_att: ""
        })
    }

    joinHandler(e) {
        this.setState({
            ...this.state,
            join_att: e.target.value
        })
    }

    onSubmitJoin(e, o) {
        join(this.state.join_att)
        this.setState({
            ...this.state,
            join_att: ""
        })
    }

    categoryHandler(e) {
        this.setState({
            ...this.state,
            cat_att: e.target.value
        })
    }

    onSubmitCategories(e, o) {
        getAllAverageUserRatings(this.state.cat_att)
        this.setState({
            ...this.state,
            cat_att: ""
        })
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
                    <Grid.Column  width={4}>
                        other side here
                    </Grid.Column>
                </Grid>


            </div>
        );
    }
}

export default Admin;
