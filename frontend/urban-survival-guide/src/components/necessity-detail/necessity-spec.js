import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import { postFavouriteBuilding } from '../../backend-client'
class NecessitySpecs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isBuildingFavourite: false
        }
        this.handleFavouriteButton = this.handleFavouriteButton.bind(this)
    }

    static defaultProps = {
        data: {
            building: {},
            isBuildingFavourite: false,
            isLiked: false,
            maintenanceCompany: {},
            necessity: {},
            services: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isBuildingFavourite !== this.props.data.isBuildingFavourite)
            this.setState({
                isBuildingFavourite: this.props.data.isBuildingFavourite
            })
    }

    getServiceList(services) {
        let items = []
        for (const [index, value] of services.entries()) {
            items.push(<p key={index}>{value.Name} - {value.State}</p>)
        }
        return items
    }

    handleFavouriteButton() {
        postFavouriteBuilding(this.props.necessityId)
        this.setState(prevState => ({ isBuildingFavourite: !prevState.isBuildingFavourite }))

    }


    render(props) {
        let { building, maintenanceCompany, necessity, services, avgRating } = this.props.data
        let items = this.getServiceList(services)
        return (
            <div>
                <h1>Details:</h1>
                <Segment vertical>
                    <h3>Necessity Status</h3>
                    <p>status: {necessity.Status}</p>
                    {necessity.Sex && <p>Sex: {necessity.Sex}</p>}
                    {necessity.Total_stalls && <p>Total Stalls: {necessity.Total_stalls}</p>}
                    {necessity.Num_fountains && <p>Number of fountains: {necessity.Num_fountains}</p>}
                    
                </Segment>
                <Segment vertical>
                    <h3>Features</h3>
                    {items}
                </Segment>
                <Segment vertical>
                    <span><h3>Building Information
                        <Button
                            floated='right'
                            active={this.state.isBuildingFavourite}
                            size='big'
                            color={this.state.isBuildingFavourite ? 'pink' : null}
                            icon='heart'
                            onClick={this.handleFavouriteButton}>
                        </Button>

                    </h3>
                    </span>
                    <p>Name: {building.Name}</p>
                    <p>Status: {building.Status}</p>
                    <p>Location: {building.Address}, {building.City} {building.Province} {building.Postal_code}</p>
                </Segment>
                <Segment vertical>
                    <h3>Maintenance Information </h3>
                    <p>Company Name: {maintenanceCompany.Name}</p>
                    <p>Description: {maintenanceCompany.Description}</p>
                    <p>Contact: {maintenanceCompany.Phone_number}</p>
                </Segment>
                <Segment vertical>
                    <h3>Statistics </h3>
                    <p>Average Rating: {avgRating}</p>
                </Segment>
            </div>
        );
    }

}

export default NecessitySpecs;
