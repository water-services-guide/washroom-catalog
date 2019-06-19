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
            <Menu borderless pointing color='teal' inverted>
                <Menu.Item>

                    <Header size='huge'>
                        Urban Survival Guide 🚽
                    </Header>

                </Menu.Item>

                <Menu.Item position='right'>
                    <Button as={Link} to='/home'>Home</Button>
                    <Button as={Link} to='/search'>Search</Button>

                    <Button
                        as={Link} to='/admin'
                        disabled={this.state.username !== "admin"}
                    >Admin</Button>
                </Menu.Item>

                <Menu.Item position='right'>
                <Button as={Link} to='/'>Log In/Sign Up</Button>
                </Menu.Item>
            </Menu>
        );
    }
}

export default Nav;
