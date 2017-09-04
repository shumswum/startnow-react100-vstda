import React, { Component } from "react";
import Todo from "./Todo";
import EditTodo from "./EditTodo";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textarea: "",
      priority: "",
      todoList: [],
      hasTodos: false
    };

    this.handleTextArea = this.handleTextArea.bind(this);
    this.priorityChecker = this.priorityChecker.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.renderWelcome = this.renderWelcome.bind(this);
  }

  handleTextArea(event) {
    this.setState({
      textarea: event.target.value
    });
  }

  priorityChecker(event) {
    this.setState({
      priority: event.target.value
    });
  }

  handleAddTodo() {
    let item = {
      description: this.state.textarea,
      priority: this.state.priority
    };
    let todoList = [...this.state.todoList];
    todoList.push(item);

    this.setState({
      todoList,
      description: "",
      priority: "9",
      hasTodos: true
    });
  }

  handleDeleteTodo(index) {
    let todoList = [...this.state.todoList];
    todoList.splice(index, 1);

    this.setState({ todoList });
  }

  handleSave(index, payload) {
    let todoList = [...this.state.todoList];
    todoList[index] = payload;

    this.setState({todoList});
  }

  renderWelcome() {
    if(this.state.todoList.length) {
      return;
    } else {
    return (
      <div>
        <strong>Welcome to Very Simple Todo App!</strong>
        <p id="para">Get started now by adding a new todo on the left.</p>
      </div>
    );
    }
  }

  renderTodos() {
    if (this.state.todoList.length) {
      return this.state.todoList.map((item, index) => {
        return (
          <Todo
            key={item.description + item.priority + index}
            description={item.description}
            priority={item.priority}
            handleDeleteTodo={this.handleDeleteTodo}
            index={index}
            handleSave={this.handleSave}
            date={item.date}
          />
        );
      });
    }
    return null;
  }

  render() {
    return (
      <div className="container cf">
        <h1 id="header">Very Simple Todo App</h1>
        <h4 id="below-header">Track all of the things</h4>
        <div className="row">
          <div className="col-4 panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Add New Todo</h3>
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">I want to..</label>
              <textarea
                value={this.state.textarea}
                onChange={this.handleTextArea}
                className="form-control create-todo-text"
                id="exampleTextarea"
                rows="3"
              />
            </div>
            <strong>How much of a priority is this?</strong>
            <select
              id="dropdown"
              value={this.state.priority}
              onChange={event => this.priorityChecker(event)}
            >
              <option value="9" disabled hidden>
                Select a Priority
              </option>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
            <div className="my-button">
              <button
                className="btn btn-default"
                onClick={() => this.handleAddTodo()}
              >
                Add
              </button>
            </div>
          </div>
          <div className="col-8 panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">View Todos</h3>
            </div>
            {this.renderWelcome(this.state.hasTodos)}
            {this.renderTodos()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
