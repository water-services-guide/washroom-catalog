import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

class IncidentReport extends Component {
    state = { open: false }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false })

    render() { 
        const { open, closeOnEscape, closeOnDimmerClick } = this.state
        return (
            <div>
                <Button onClick={this.closeConfigShow(false, true)}>Report an Incident</Button>

                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                >
                    <Modal.Header>Report an Incident</Modal.Header>
                    <Modal.Content>





                        <Form>
                            <Form.Group widths='equal'>
                            <Form.Input fluid label='Subject' placeholder='Subject' />
                            <Form.TextArea label='Incident' placeholder='Tell us more...' />
                            </Form.Group>
                            <Form.Button onsubmit={close}>Submit</Form.Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default IncidentReport