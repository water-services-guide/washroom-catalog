import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

class NecessitySpecs extends Component {
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

    getServiceList(services) {
        let items = []
        for (const [index, value] of services.entries()) {
            items.push(<p key={index}>{value.Name} - {value.State}</p> )  }
        return items
    }

    render(props) {
        let {building, isBuildingFavourite, isLiked, maintenanceCompany, necessity, services} = this.props.data        
        let items = this.getServiceList(services)
        return (
            <div>
                <h1>Details:</h1>
                <Segment vertical>
                    <h3>Necessity Status</h3>
                    <p>status: {necessity.Status}</p>
                    {necessity.Sex && <p>Sex: {necessity.Sex}</p>}
                    {necessity.Total_stalls && <p>Total Stalls: {necessity.Total_stalls}</p>}
                </Segment>
                <Segment vertical>
                <h3>Features</h3>
                {items}
                </Segment>
                <Segment vertical>
                    <h3>Building Information</h3>
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
            </div>
        );
    }

}

export default NecessitySpecs;
