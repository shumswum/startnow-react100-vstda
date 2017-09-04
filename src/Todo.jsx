import React, { Component } from "react";
import PropTypes from "prop-types";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      editPriority: this.props.priority,
      editDescription: this.props.description,
      date: this.props.date
    };

    this.getEditPriority = this.getEditPriority.bind(this);
    this.getPriority = this.getPriority.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEditPriority = this.handleEditPriority.bind(this);
  }

  getPriority(priority) {
    switch (priority) {
      case "1":
        return "green";
      case "2":
        return "yellow";
      case "3":
        return "red";
    }
  }

  getEditPriority(editPriority) {
    switch (editPriority) {
      case "1":
        return "edit-green";
      case "2":
        return "edit-yellow";
      case "3":
        return "edit-red";
    }
  }

  handleSave() {
    const payload = {
      priority: this.state.editPriority,
      description: this.state.editDescription,
      date: this.state.date
    };
    this.props.handleSave(this.props.index, payload);

    this.setState({ edit: false });
  }

  handleEdit() {
    this.setState({ edit: true });
  }

  handleEditTextArea(event) {
    this.setState({ editDescription: event.target.value });
  }

  handleDate(event) {
    this.setState({ date: event.target.value });
  }

  handleEditPriority(event) {
    this.setState({editPriority: event.target.value});
  }

  renderContent() {
    if (this.state.edit) {
      return (
        <div className={this.getEditPriority(this.state.editPriority)}>
          <div className="edit-textarea">
            <textarea
              value={this.state.editDescription}
              className="form-control update-todo-text"
              id="exampleTextarea"
              rows="3"
              onChange={event => this.handleEditTextArea(event)}
            />
          </div>
          <div className="flex-here">
            <div className="date-edit">
              <strong className="edit-me">Due Date</strong>
              <input
                value={this.state.date}
                onChange={event => this.handleDate(event)}
                placeholder="mm/dd/yyyy"
                className="update-todo-date"
              />
            </div>
            <div className="priority-edit">
              <strong className="edit-me">Priority</strong>
              <select
                name="Select a Priority"
                className="update-todo-priority"
                defaultValue={this.state.editPriority}
                value={this.state.editPriority}
                onChange={ event => this.handleEditPriority(event)}
              >
                <option disabled>Select a Priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
          </div>
          <button className="save-button btn update-todo" onClick={() => this.handleSave()}>
            Save
          </button>
        </div>
      );
    }
    return (
      <div
        className={`panel new-todo ${this.getPriority(this.props.priority)}`}
      >
        <div className="mycheck">
          <input type="checkbox" />
        </div>
        <div className="description">
          <strong className="reset">
            {this.props.description}
          </strong>
        </div>
        <div className="my-icons">
          <button
            type="button"
            className="btn btn-default pencil edit-todo"
            onClick={() => this.handleEdit()}
          >
            <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn btn-default trash delete-todo"
            onClick={() => this.props.handleDeleteTodo(this.props.index)}
          >
            <span className="glyphicon glyphicon-trash" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

Todo.propTypes = {
  description: PropTypes.string,
  priority: PropTypes.string
};

export default Todo;
