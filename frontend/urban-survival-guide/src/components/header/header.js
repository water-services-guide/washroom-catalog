import React, { Component } from 'react';
import { Menu, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

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
            <Menu borderless pointing color='teal' inverted>
                <Menu.Item>

                    <Header size='huge'>
                        Urban Survival Guide 🚽
                    </Header>

                </Menu.Item>

                <Menu.Item position='right'>
                    <Button
                        as={Link} to='/admin'
                        disabled={this.state.username != "admin"}
                    >Admin</Button>
                </Menu.Item>

                <Menu.Item position='right'>
                    <Button >Sign Up</Button>
                </Menu.Item>
            </Menu>
        );
    }
}

export default Nav;