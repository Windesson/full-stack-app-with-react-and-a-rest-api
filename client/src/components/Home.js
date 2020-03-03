import React, {Component} from 'react';
import CourseList from './CourseList'

export default class Home extends Component {
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
           <CourseList courses={this.state.courses}/>}
        </div>
        </div>
      );
    }
  }