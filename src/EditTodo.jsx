import React from 'react';
import PropTypes from 'prop-types';

const EditTodo = props => {
  return (
    <div>
      <textarea value={props.description} className="form-control update-todo-text" id="exampleTextarea" rows="3"></textarea>
      <div className='flex-here'>
        <div className='date-edit'>
          <strong className='edit-me'>Due Date</strong>
          <input placeholder='mm/dd/yyyy' className='update-todo-date'/>
        </div>
        <div className='priority-edit'>
          <strong className='edit-me'>Priority</strong>
          <select name='Select a Priority' className='update-todo-priority'>
            <option disabled>Select a Priority</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
      </div>
      <button className='save-button btn'>Save</button>
    </div>
  );
};

EditTodo.propTypes = {
  description: PropTypes.string,
  priority: PropTypes.string
}

export default EditTodo;
