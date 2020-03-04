import React, {Component} from 'react';
import { Link } from 'react-router-dom';

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
        return (
          <div className="bounds">
          <div className="grid-100"> 
            {(this.state.loading ) ? 
             <p className="loading"> Loading...</p> : 
             <CourseDetailContainer course={this.state.course} HandleDelete={this.HandleDelete}/>
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
        .then( errors => {
          if (errors === null) {
            this.props.history.push('/');
          } else {
            console.log(`SUCCESS! '${title}' is now deleted!`);
         }
        })
        .catch( err => {
          console.log(err);
          this.props.history.push('/error');
        })  
    }
}

const CourseDetailContainer = ({course, HandleDelete}) => {
    if(course){
        return (
           <div>
             <DetailActions id={course.id} HandleDelete={HandleDelete}/>
             <DetailBound course={course}/>
           </div>
       );
    } else {
        return (<h3>Course Not Found</h3>);
    }
}
  
const DetailBound = ({course}) => {
   return (
        <div className="bounds course--detail">
            <div className="grid-66">
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <p>By {course.User.firstName} {course.User.lastName}</p>
            </div>
            <div className="course--description">
                <p>{course.description}</p>
            </div>
            </div>
            <DetailStats />
        </div>
   );
}

const DetailActions = ({id,HandleDelete}) => {
    return (
        <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <span>
              <Link  className="button" to={`/courses/${id}/update`} >Update Course</Link>
              <Link  className="button" onClick={HandleDelete} to="#">Delete Course</Link>
            </span>
               <Link  className="button button-secondary" to="/">Return to List</Link>
          </div>
        </div>
      </div>
    );
}

const DetailStats = () => {
    return (
        <div className="grid-25 grid-right">
        <div className="course--stats">
          <ul className="course--stats--list">
            <li className="course--stats--list--item">
              <h4>Estimated Time</h4>
              <h3>14 hours</h3>
            </li>
            <li className="course--stats--list--item">
              <h4>Materials Needed</h4>
              <ul>
                <li>1/2 x 3/4 inch parting strip</li>
                <li>1 x 2 common pine</li>
                <li>1 x 4 common pine</li>
                <li>1 x 10 common pine</li>
                <li>1/4 inch thick lauan plywood</li>
                <li>Finishing Nails</li>
                <li>Sandpaper</li>
                <li>Wood Glue</li>
                <li>Wood Filler</li>
                <li>Minwax Oil Based Polyurethane</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
}