import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CoursesDetail extends Component {
    
    state = {
        course : null,
        loading: true,
        errors : [],
    }

    componentDidMount(){
        this.search();
    }

    search = () => {
        const { context } = this.props;
        this.setState( { loading: true }) 
        context.data.getCourse(this.props.match.params.id)
        .then( course  => {
          this.setState( { course }) 
        })
        .catch( () => {
          this.props.history.push('/NotFound')
        })
        .finally( () => {
          this.setState( { loading: false})
        }); 
    }

    render() {
        const authenticatedUser = this.props.context.authenticatedUser;
        const course = this.state.course;
        return (
          <div className="bounds">
          <div className="grid-100"> 
            {(this.state.loading ) ? 
             <p className="loading"> Loading...</p> : 
               ( authenticatedUser && authenticatedUser.id === course.userId) ?
              <CourseDetailContainer course={course} HandleDelete={this.HandleDelete} errors={this.state.errors}/>
              :
              <CourseDetailContainer course={course} errors={this.state.errors}/>
             }
          </div>
          </div>
        );
      }

    HandleDelete = () => {
        const { context } = this.props;
        const { id, title } = this.state.course;
        const {encodedCredentials} = context.authenticatedUser;

        context.data.deleteCourse(id, encodedCredentials)
        .then( result => {
          if (result.status === 204) {
            console.log(`SUCCESS! '${title}' is now deleted!`);
            this.props.history.push('/');
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
}

const CourseDetailContainer = ({course, HandleDelete, errors}) => {
    if(course){
        return (
           <div>
            <ErrorsDisplay errors={errors} />
             <div className="actions--bar">
              <div className="bounds">
               <div className="grid-100">
                {(HandleDelete)?
                  <span>
                    <Link  className="button" to={`/courses/${course.id}/update`} >Update Course</Link>
                    <Link  className="button" onClick={HandleDelete} to="#">Delete Course</Link>
                  </span> : ''
                }
                  <Link  className="button button-secondary" to="/">Return to List</Link>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        <p>By {course.User.firstName} {course.User.lastName}</p>
                    </div>
                    <div className="course--description">
                        <p><ReactMarkdown source={course.description} /></p>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>                            
                            <h3><ReactMarkdown source={course.estimatedTime} /></h3>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <ul>
                             { (course.materialsNeeded) ?
                                (course.materialsNeeded.split("*").filter(filterMarkDown).map((material, i) => <li key={i}><ReactMarkdown source={material} /></li>))
                                :''
                             }
                             </ul>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
           </div>
       );
    } else {
        return (<h3>Course Not Found</h3>);
    }
}

function filterMarkDown(material) {
    return (material.trim() !== '')
}

function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;
  
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        </div>
      );
    }
  
    return errorsDisplay;
  }
  