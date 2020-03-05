import React, { Component } from 'react';
import Form from './Form';
import CourseForm from './CourseForm';

export default class CreateCourse extends Component {
  state = {
    title : '',
    description : '',
    estimatedTime : '', 
    materialsNeeded: '',
    errors: [],
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    const { context } = this.props;
    const {firstName, lastName} = context.authenticatedUser;
    const authorName = `${firstName} ${lastName}`
    const onChange = this.change;

    return (
        <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (    
                 <CourseForm {...{title, description, estimatedTime, materialsNeeded, authorName, onChange}}/>
            )} />
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    // const { context } = this.props;
    // const { username, password } = this.state;
    // const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };

    // context.actions.signIn(username, password)
    // .then( user => {
    //   if (user === null) {
    //     this.setState(() => {
    //       return { errors: [ 'Sign-in was unsuccessful' ] };
    //     });
    //   } else {
    //     this.props.history.push(from);
    //     console.log(`SUCCESS! ${username} is now signed in!`);
    //  }
    // })
    // .catch( err => {
    //   console.log(err);
    //   this.props.history.push('/error');
    // })  
     
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
