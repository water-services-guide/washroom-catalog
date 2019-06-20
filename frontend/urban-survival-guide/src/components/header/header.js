import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';

class Nav extends Component {
    constructor(props) {
        super(props)

        // let username = "admin"
        this.state = {
            activeItem: ""
        }

        this.handleItemClick = this.handleItemClick.bind(this)
    }

    style = {
        'backgroundColor': 'rgb(226, 251, 255)'
    }

    handleItemClick = (e, { name }) => {
        this.setState({ ...this.state, activeItem: name })
    }

    handleSignOut = event => {
        localStorage.clear();
        this.props.setLoggedIn(false);
    }

    render() {
        let signOutButton;
        let adminButton;
        let searchButton;
            
        if (localStorage.getItem('user_id') !== null) {
            signOutButton =
            <Menu.Item as={Link} name='profile' to='/login' active={activeItem === "profile"} onClick={this.handleSignOut}>
                <h3>Sign Out</h3>
            </Menu.Item>;

            searchButton =                 
            <Menu.Item as={Link} to='/search' position="right" name="search" active={activeItem === "search"} onClick={this.handleItemClick} >
            <h3>Search</h3>
            </Menu.Item>;

            if (localStorage.getItem('username') === 'admin') {
                adminButton = 
                <Menu.Item as={Link} to='/admin' name="admin" active={activeItem === "admin"}  onClick={this.handleItemClick} >
                    <h3>Admin</h3>
                </Menu.Item>
            } else {
                adminButton = null;
            }
        } else {
            signOutButton = null;
            adminButton = null;
            searchButton = null;
        }

        let {activeItem} = this.state
        return (
            <Menu borderless pointing secondary color='teal' style={this.style} >
                <Menu.Item as={Link} to='/'>
                    <Header size='huge'>
                        🚽  Urban Survival Guide
                    </Header>
                </Menu.Item>
                {searchButton}
                {adminButton}
                {signOutButton}
            </Menu>
        );
    }
}

export default Nav;
