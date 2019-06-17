import React, {Component} from 'react';
import {Segment, Grid, Icon, Button, Divider, Header, Input} from 'semantic-ui-react';

class Login extends Component {
  render () {
    return (
      <Segment placeholder>
          <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>Or</Divider>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Header icon>
                <Icon name='sign in' />
                Log Into Existing Account
              </Header>
              <div>
                <Input icon='user' iconPosition='left' placeholder='Username'>
                </Input>
              </div>
              <br/ >
              <div>
                <Input icon='lock' iconPosition='left' placeholder='Password'>
                 </Input>
              </div>
              <br/ >
              <div>
                <Button basic color="blue">
                  Log In
                </Button>    
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name='signup' />
                Sign Up New Account
              </Header>
              <div>
                <Input icon='user' iconPosition='left' placeholder='Username'>
                </Input>
              </div>
              <br/ >
              <div>
                <Input icon='lock' iconPosition='left' placeholder='Password'>
                </Input>    
              </div>
              <br/ >
              <div>
                <Button basic color="teal">
                  Sign Up
                </Button>    
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );

  }
}

export default Login;