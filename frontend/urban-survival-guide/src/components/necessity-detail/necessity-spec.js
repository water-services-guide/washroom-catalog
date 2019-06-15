import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

class NecessitySpecs extends Component {
    static defaultProps = {
        data: {
        building: {}, 
        isBuildingFavourite: false,
        isLiked: false,
        maintenaceCompany: {},
        necessity: {},
        services: []  
        }  
    }

    render(props) {
        var {building, isBuildingFavourite, isLiked, maintenaceCompany, necessity, services} = this.props.data
        console.log( "again: " + JSON.stringify(this.props))
        return (
            <div>
                <h1>Details:</h1>
                <Segment vertical>
                    <h3>Building Information</h3>
                    <p>Location: {building.Address}</p>
                </Segment>
                <Segment vertical>Pellentesque habitant morbi tristique senectus.</Segment>
                <Segment vertical>Pellentesque habitant morbi tristique senectus.</Segment>
                <Segment vertical>Pellentesque habitant morbi tristique senectus.</Segment>
            </div>
        );
    }

}

export default NecessitySpecs;
