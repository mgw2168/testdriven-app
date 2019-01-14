import React, { Component } from 'react';
import axios from 'axios';
import About from './components/About'
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Form from './components/Form'


class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      username: '',
      email: '',
      title: 'TestDriven.io',
      formData: {
        username: '',
        email: '',
        password: ''
      }
    };
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };
  componentDidMount() {
    this.getUsers();
  };
  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then((res) => { this.setState({ users: res.data.data.users }); })
    .catch((err) => { console.log(err); });
  };
  addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    };
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
    .then((res) => {
      this.getUsers();
      this.setState({ username: '', email: '' });
    })
    .catch((err) => { console.log(err); });
  };
  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };
  render() {
    return (
      <div>
        <NavBar title={this.state.title} />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <br/>
                <Switch>
                  <Route exact path='/register' render={() => (
                    <Form
                      formType={'Register'}
                      formData={this.state.formData}
                    />
                  )} />
                  <Route exact path='/login' render={() => (
                    <Form
                      formType={'Login'}
                      formData={this.state.formData}
                    />
                  )} />
                  <Route exact path='/' render={() => (
                    <div>
                      <h1 className="title is-1">All Users</h1>
                      <hr/><br/>
                      <AddUser
                        username={this.state.username}
                        email={this.state.email}
                        addUser={this.addUser}
                        handleChange={this.handleChange}
                      />
                      <br/><br/>
                      <UsersList users={this.state.users}/>
                    </div>
                  )} />
                  <Route exact path='/about' component={About}/>
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
};

export default App;