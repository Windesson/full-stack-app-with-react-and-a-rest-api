import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
    state = {
        courses : [],
        loading: true,
    }

    componentDidMount(){
      this.search();
    }

    search = () => {
      const { context } = this.props;
      this.setState( { loading: true }) 
      context.data.getCourses()
      .then( courses  => {
        this.setState( { loading: false, courses }) 
      })
      .catch( () => {
        this.setState( { loading: false, courses : [] }) 
      }); 
    }

    render() {
      return (
        <div className="bounds">
        <div className="grid-100"> 
          {(this.state.loading ) ? 
           <p className="loading"> Loading...</p> : 
           <CoursesContainer courses={this.state.courses}/>
           }
        </div>
        </div>
      );
    }
  }

const CoursesContainer = ({courses}) => {
    
    if(courses && courses.length > 0){
        return (    
            <div className="bounds">
              <React.Fragment> 
              { 
                courses.map( course =>  <Course title={course.title} key={course.id} id={course.id}/>)
              }
              </React.Fragment>
              <div className="grid-33">
                  <Link className="course--module course--add--module"  to="/courses/create" >
                    <h3 className="course--add--title">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
                      x="0px" y="0px" viewBox="0 0 13 13" className="add">
                      <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                      </svg>New Course
                    </h3>
                 </Link>
              </div>
            </div>
         )
    } else {
        return (<h3>No Courses Found</h3>);
    }
}

const Course = ({title, id}) => {

  return (
       <div className="grid-33">
          <a className="course--module course--link" href={`/courses/${id}`}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{title}</h3>
          </a>
      </div>
  );
}

export default Courses;