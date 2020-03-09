import React, { Component } from 'react';
import Form from './Form';
import CourseForm from './CourseForm';

/**
 * his component provides the "Update Course" screen by rendering a form that 
 * allows a user to update one of their existing courses. The component also 
 * renders an "Update Course" button that when clicked sends a PUT request 
 * to the REST API's /api/courses/:id route. This component also renders a "Cancel" 
 * button that returns the user to the "Course Detail" screen.
 */
export default class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    loading: true,
    errors: [],
  }

  componentDidMount(){
    this.search();
  }

  search = () => {
        const { context } = this.props;
        this.setState( { loading: true }) 
        context.data.getCourse(this.props.match.params.id)
        .then( course  => {
        this.setState( { ...course }) 
        })
        .catch( () => {
        this.props.history.push('/NotFound')
        })
        .finally( () => {
        this.setState( { loading: false})
        }); 
  }

  render() {

    if(this.state.loading){
        return (<div>Loading...</div>);
    };

    const title = this.state.title || '';
    const description = this.state.description || '';
    const estimatedTime = this.state.estimatedTime || '';
    const materialsNeeded = this.state.materialsNeeded || '';

    const {
        errors
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
            submitButtonText="Update Course"
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
    const { encodedCredentials } = context.authenticatedUser;
    const course = {        
        id : this.state.id,
        title: this.state.title,
        description : this.state.description,
        estimatedTime : this.state.estimatedTime,
        materialsNeeded : this.state.materialsNeeded
    }

    context.data.updateCourse(course,encodedCredentials)
    .then( result => {
      if (result.status === 204 ) {
        this.props.history.push(`/courses/${course.id}`);
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
    this.props.history.push(`/courses/${this.state.id}`);
  }
}
