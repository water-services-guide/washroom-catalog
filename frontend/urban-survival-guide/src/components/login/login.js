import React, { Component } from 'react';
import { Segment, Grid, Icon, Button, Divider, Header, Input } from 'semantic-ui-react';
import { postUser } from '../../backend-client'
import axios from 'axios';

class Login extends Component {
  API = "http://localhost:5000/"

  constructor(props) {
    super(props);

    this.state = {
      loginUsername: "",
      loginPassword: "",
      signupUsername: "",
      signupPassword: "",
    };

    this.findUserByCredentials = this.findUserByCredentials.bind(this);
  }

  validateLogInForm() {
    return this.state.loginUsername.length > 0 && this.state.loginPassword.length > 0;
  }

  validateSignUpForm() {
    return this.state.signupUsername.length > 0 && this.state.signupPassword.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleLogIn = event => {
    event.preventDefault();
    this.findUserByCredentials(this.state.loginUsername, this.state.loginPassword);
    // if user exists, successful login
    // add user id to local storage
    // reroute to user home page
  }

  handleSignUp = event => {
    event.preventDefault();
    alert("You try to sign up new user with username " + this.state.signupUsername + "with password: " + this.state.signupPassword)
    postUser(this.state.signupUsername, this.state.signupPassword)
    // if user with username = signupUsername does not exist
    // add new user with given password
    // a small alert thingy maybe
  }

  findUserByCredentials(username, password) {
    axios.get(this.API + "logIn?username=" + username + "&password=" + password).then((response) => {
      if (response.data.User_id === undefined) {
        alert('Wrong username or password!');
      } else {
        localStorage.setItem('user_id', response.data.User_id);
      }
    });
  }

  render() {
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
                <Input
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  id="loginUsername"
                  value={this.state.loginUsername}
                  onChange={this.handleChange}
                  focus
                  autoFocus
                />
              </div>
              <br />
              <div>
                <Input
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  id="loginPassword"
                  value={this.state.loginPassword}
                  onChange={this.handleChange}
                  focus
                />
              </div>
              <br />
              <div>
                <Button color="blue" onClick={this.handleLogIn}>
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
                <Input
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  id="signupUsername"
                  value={this.state.signupUsername}
                  onChange={this.handleChange}
                  focus
                />
              </div>
              <br />
              <div>
                <Input
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  id="signupPassword"
                  value={this.state.signupPassword}
                  onChange={this.handleChange}
                  focus
                />
              </div>
              <br />
              <div>
                <Button color="teal" onClick={this.handleSignUp}>
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