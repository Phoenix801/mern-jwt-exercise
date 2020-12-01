import React, { Component } from 'react';
import axios from 'axios';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeUserType = this.onChangeUserType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        username: '',
        password: '',
        password2: '',
        email: '',
        phone: '',
        user_type: 'trainee'
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  
  onChangePassword2(e) {
    this.setState({
      password2: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState( {
        email: e.target.value
    });
}

onChangePhone(e) {
    this.setState( {
        phone: e.target.value
    });
}

onChangeUserType(e) {
    this.setState( {
        user_type: e.target.value
    });
}

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      email: this.state.email,
      phone: this.state.phone,
      user_type: this.state.user_type
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

      this.state = {
        username: '',
        password: '',
        password2: '',
        email: '',
        phone: '',
        user_type: ''
    }
}

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
            </div>
            <div className="form-group"> 
              <label>Email: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  />
                  </div>
            <div className="form-group"> 
             <label>Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
            </div>
            <label>Repeat Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password2}
                onChange={this.onChangePassword2}
                />
            <div className="form-group">
              <label>Phone Number: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.phone}
                  onChange={this.onChangePhone}
                  />
            </div>
            <div className="form-group">
              <label>User Type: </label>
              <div>
              <select value={this.state.value} onChange={this.onChangeUserType}>
                <option value="trainee">Trainee</option>
                <option value="trainer">Trainer</option>
              </select>
              </div>
            </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}