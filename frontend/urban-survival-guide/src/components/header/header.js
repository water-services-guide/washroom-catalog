import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Menu } from 'semantic-ui-react';

class Nav extends Component {
    constructor(props){
        super(props)

        let username = "admin"
        this.state = {
            username: username
        }
    }


    render() {
        return (
            <Menu borderless pointing secondary color='teal'>
                <Menu.Item as={Link} to='/home'>

                    <Header size='huge'>
                        Urban Survival Guide 🚽
                    </Header>

                </Menu.Item>


                <Menu.Item as={Link} to='/search' position="right" >
                    <h3>Search</h3>
                </Menu.Item>

                <Menu.Item as={Link} to='/admin'
                disabled={this.state.username !== "admin"}>
                <h3>Admin Page</h3>
                </Menu.Item>
                <Menu.Item as={ Link } name='profile' to='/'>
                   <h3>Log In/Sign Up</h3> 
                </Menu.Item>
            </Menu>
        );
    }
}

export default Nav;
