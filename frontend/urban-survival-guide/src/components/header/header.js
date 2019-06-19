import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Menu } from 'semantic-ui-react';

class Nav extends Component {
    constructor(props) {
        super(props)

        let username = "admin"
        this.state = {
            username: username,
            activeItem: ""
        }

        this.handleItemClick = this.handleItemClick.bind(this)
    }

    style = {
        'background-color': 'rgb(226, 251, 255)'
    }

    handleItemClick = (e, { name }) => {
        this.setState({ ...this.state, activeItem: name })
    }

    render() {
        let {activeItem} = this.state
        return (
            <Menu borderless pointing secondary color='teal' style={this.style} >
                <Menu.Item as={Link} to='/home'>
                    <Header size='huge'>
                        🚽  Urban Survival Guide
                    </Header>
                </Menu.Item>
                <Menu.Item as={Link} to='/search' position="right" name="search" active={activeItem == "search"} onClick={this.handleItemClick} >
                    <h3>Search</h3>
                </Menu.Item>
                <Menu.Item as={Link} to='/admin'
                    disabled={this.state.username !== "admin"} name="admin" active={activeItem == "admin"}  onClick={this.handleItemClick}>
                    <h3>Admin</h3>
                </Menu.Item>
                <Menu.Item as={Link} name='profile' to='/' active={activeItem == "profile"} onClick={this.handleItemClick}>
                    <h3>Log In/Sign Up</h3>
                </Menu.Item>
            </Menu>
        );
    }
}

export default Nav;
