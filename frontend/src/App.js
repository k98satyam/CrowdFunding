import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import Navbar from './components/navbar/Navbar' 
import CreateProject from './components/project/createProject'
import UserProfile from './components/profile/userProfile';
import { signIn } from './store/actions/authAction';
import { connect } from 'react-redux';
import IndividualProject from './components/project/individualProject';
import DisplayAllProject from './components/project/displayAllProject';

class App extends Component {
  
  async componentDidMount() {
    await this.props.signIn()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path = "/" component = { DisplayAllProject } />
            <Route path = "/signin" component = { SignIn } />
            <Route path = "/create" component = { CreateProject } />
            <Route path = "/profile" component = { UserProfile } />
            <Route path = "/indvProject/:id" component = { IndividualProject } />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      signIn : () => dispatch(signIn())
  }
}

export default connect(null,mapDispatchToProps)(App);