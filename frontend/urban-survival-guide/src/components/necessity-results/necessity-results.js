import React, { Component } from 'react'
import { Image, Card } from 'semantic-ui-react'
import image from '../../../images/default-image.png'
import { Link } from 'react-router-dom'



class NecessityResults extends Component {


    render() {
        return (
            <div>
                {/* TODO the necessity id must be dynamic */}
                <Link to="/necessity/washroom/1">
                    <Card>
                        <Image src={image} />
                        <Card.Content>
                            <Card.Header>Necessity Name</Card.Header>
                            <Card.Description>
                                Some small detail about the necessity
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            maybe something else about the necessity?
                        </Card.Content>
                    </Card>
                </Link>
            </div>
        )
    }
}

export default NecessityResults
