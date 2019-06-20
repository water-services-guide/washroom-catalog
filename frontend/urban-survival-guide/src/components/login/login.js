import React, { Component } from 'react';
import { Segment, Grid, Icon, Button, Divider, Header, Input } from 'semantic-ui-react';
import { postUser } from '../../backend-client'
import axios from 'axios';
import { Redirect } from 'react-router'

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
    this.tryToSignUp = this.tryToSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleLogIn = event => {
    event.preventDefault();
    this.findUserByCredentials(this.state.loginUsername, this.state.loginPassword);
  }

  handleSignUp = event => {
    event.preventDefault();
    this.tryToSignUp(this.state.signupUsername);
  }

  findUserByCredentials(username, password) {
    axios.get(this.API + "logIn?username=" + username + "&password=" + password).then((response) => {
      if (response.data.User_id === undefined) {
        alert('Wrong username or password!');
      } else {
        localStorage.setItem('user_id', response.data.User_id);
        localStorage.setItem('username', response.data.Username);
        this.props.setLoggedIn(true);
      }
    });
  }

  tryToSignUp(username) {
    axios.get(this.API + "getUserIdByUsername?username=" + username).then((response) => {
      if (response.data.User_id === undefined) {
        postUser(this.state.signupUsername, this.state.signupPassword);
      } else {
        alert("Username '" + this.state.signupUsername + "' is already taken. Try another username.");
      }
    });
  }

  render() {
    if (localStorage.getItem("user_id") !== null) {
      return <Redirect to="/" />;
    }

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