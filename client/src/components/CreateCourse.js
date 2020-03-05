import React, { Component } from 'react';
import Form from './Form';

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
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                   <h4 className="course--label">Course</h4>
                   <div> 
                    <input 
                      id="title" 
                      name="title" 
                      type="text" 
                      className="input-title course--title--input" 
                      placeholder="Course title..."
                      onChange={this.change} 
                      value={title}/>
                    </div>
                    <p>{authorName}</p>
                    </div>
                    <div className="course--description">
                    <div>
                     <textarea 
                      id="description" 
                      name="description" 
                      value={description}
                      onChange={this.change} 
                      placeholder="Course description...">
                      </textarea>
                    </div>
                   </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div> 
                       <input 
                        id="estimatedTime" 
                        name="estimatedTime" 
                        type="text" 
                        className="course--time--input"
                        placeholder="Hours" 
                        value={estimatedTime}
                        onChange={this.change} />
                     </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea 
                          id="materialsNeeded" 
                          name="materialsNeeded" 
                          className="" 
                          placeholder="List materials..."
                          value={materialsNeeded}
                          onChange={this.change} >
                        </textarea></div>
                       </li>
                    </ul>
                  </div>
                </div>             
              </React.Fragment>
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
