import React, { Component } from 'react';
import Form from './Form';
import CourseForm from './CourseForm';

/**
 * This component provides the "Create Course" screen by rendering a form 
 * that allows a user to create a new course. The component also renders 
 * a "Create Course" button that when clicked sends a POST request to the 
 * REST API's /api/courses route. This component also renders a "Cancel" 
 * button that returns the user to the default route (i.e. the list of courses).
 */
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
    const { context } = this.props;
    const { encodedCredentials , id } = context.authenticatedUser;
    const course = {        
        title: this.state.title,
        description : this.state.description,
        estimatedTime : this.state.estimatedTime,
        materialsNeeded : this.state.materialsNeeded,
        userId : id
    }

    context.data.createCourse(course,encodedCredentials)
    .then( result => {
      if (result.status === 201 ) {
        this.props.history.push(`/`);
      } else {
        this.setState(() => {
            return { errors: result.errors };
       });
     }
    })
    .catch( err => {
      console.log(err);
      this.props.history.push('/error');
    })  
     
  }

  cancel = () => {
    this.props.history.push('/');
  }

}
