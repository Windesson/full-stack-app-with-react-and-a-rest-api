import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// import components 
import PrivateRoute from './components/PrivateRoute';
import Courses from './components/Courses';
import Header from './components/Header';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import ErrorRoute from './components/Error';
import Forbidden from './components/Forbidden';

// adding Cosumer context to access authenticated user info
import withContext from './Context';

// assign context to consumer 
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


// route routes
export default () => (
  <Router>
    <div>
      <HeaderWithContext />
      <hr/>
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <Route exact path="/signin" component={UserSignInWithContext} />
        <Route exact path="/signup" component={UserSignUpWithContext} />
        <Route exact path="/signout" component={UserSignOutWithContext} />
        <Route exact path="/error" component={ErrorRoute} />
        <Route exact path="/notfound"component={NotFound} />
        <Route exact path="/forbidden"component={Forbidden} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
