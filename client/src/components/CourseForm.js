import React from 'react';

/**
 * Component form to handle update and creating courses.
 */
export default (props) => {
    const {
        onChange,
        title,
        authorName,
        description,
        estimatedTime,
        materialsNeeded
    } = props;

    return (
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
          onChange={onChange} 
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
          onChange={onChange} 
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
            onChange={onChange} />
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
              onChange={onChange} >
            </textarea></div>
           </li>
        </ul>
      </div>
    </div>           
    </React.Fragment>  
  );
};