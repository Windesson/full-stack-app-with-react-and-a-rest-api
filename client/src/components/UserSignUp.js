import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.onChange} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.onChange} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress"
                  type="emailAddress"
                  value={emailAddress} 
                  onChange={this.onChange} 
                  placeholder="Email Address" />
                  <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.onChange} 
                  placeholder="Password" />
                  <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword} 
                  onChange={this.onChange} 
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    };

    if(confirmPassword !== password) {
      this.setState({ errors : ["Password doesn't match."]})
      return;
    };

    context.data.createUser(user)
    .then( errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        console.log(`${emailAddress} is successfully signed up and authenticated!`);
        context.actions.signIn(emailAddress, password)
        .then(() => {
          this.props.history.push('/');    
        });
      }
    })  
    .catch( err => { // handle rejected promises
      console.log(err);
      this.props.history.push('/error'); // push to history stack
    });  
   
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
