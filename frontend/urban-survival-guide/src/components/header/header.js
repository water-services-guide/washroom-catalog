import React, { Component } from 'react';
import { Menu, Button, Header } from 'semantic-ui-react'

class Nav extends Component {

    render() {
        return (
            <Menu borderless pointing color='teal' inverted>
                <Menu.Item>

                    <Header size='huge'>
                            Urban Survival Guide 🚽
                    </Header>

                </Menu.Item>


                <Menu.Item position='right'>
                    <Button >Sign Up</Button>
                </Menu.Item>
            </Menu>
        );
    }
}

export default Nav;