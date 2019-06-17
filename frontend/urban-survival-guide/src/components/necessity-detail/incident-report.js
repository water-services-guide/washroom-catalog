import React, { Component } from 'react'
import { Button, Modal, Form, Select } from 'semantic-ui-react'
import { postIncidentReport } from '../../backend-client'


class IncidentReport extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            subject: "",
            content: "",
            severity: 1
        }
    }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => {
        let {content, severity, subject} = this.state
        postIncidentReport(new Date(), content, severity, subject, this.props.necessity_id)
        this.setState({
            ...this.state,
            open: false,
            subject: "",
            content: "",
            severity: 1
        })
    }

    subjectInputHandler = (e) => {
        this.setState({
            ...this.state,
            subject: e.target.value
        })
    }

    contentInputHandler = (e) => {
        this.setState({
            ...this.state,
            content: e.target.value
        })
    }


    dropdownInputHandler = (e, {value}) => {
        this.setState({
            ...this.state,
            severity: value
        })
    }


    options = [
        { key: 1, text: '1', value: 1 },
        { key: 2, text: '2', value: 2 },
        { key: 3, text: '3', value: 3 },
        { key: 4, text: '4', value: 4 },
        { key: 5, text: '5', value: 5 },
    ]

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state
        return (
            <div>
                <Button onClick={this.closeConfigShow(false, true)} negative>Report an Incident</Button>

                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                >
                    <Modal.Header>Report an Incident</Modal.Header>
                    <Modal.Content>
                        <Form widths="equal" >
                            <Form.Group >
                                <Form.Input
                                    fluid label='Subject'
                                    placeholder='Subject'
                                    onChange={this.subjectInputHandler}
                                    value={this.state.subject}
                                />

                                <Form.Field 
                                    control={Select} 
                                    label='Severity' 
                                    options={this.options}
                                    onChange={this.dropdownInputHandler}
                                    laceholder='Severity' />
                            </Form.Group>
                            <Form.Group >
                                <Form.TextArea
                                    label='Incident'
                                    placeholder='Tell us more...'
                                    onChange={this.contentInputHandler}
                                    value={this.state.content}
                                />
                            </Form.Group>
                        </Form>
                        <Modal.Actions>
                            <Button
                                onClick={this.close}
                                positive
                                labelPosition='right'
                                icon='checkmark'
                                content='Submit'
                            />
                        </Modal.Actions>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default IncidentReport