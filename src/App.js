import './App.css';
import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import SearchSort from './components/SearchSort';
import TaskListTable from './components/TaskListTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue: -1
    }
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({ tasks: tasks });
    }
    // localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  _ToggleNewTask = () => {
    const { isDisplayForm, taskEditing } = this.state;
    if (isDisplayForm && taskEditing !== null) {
      this.setState({ isDisplayForm: true, taskEditing: null })
    }
    else {
      this.setState({ isDisplayForm: !isDisplayForm, taskEditing: null })
    }
  }
  onCloseForm = () => {
    const { isDisplayForm } = this.state;
    this.setState({ isDisplayForm: !isDisplayForm })
  }
  onShowForm = () => {
    const { isDisplayForm } = this.state;
    this.setState({ isDisplayForm: true })
  }
  onSubmit = (data) => {
    let { tasks } = this.state;
    if (!data.id) {
      data.id = this.generateId();
      tasks = tasks.concat(data);
    }
    else {
      const index = this.findIndexById(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    console.log(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  generateId() {
    return this.s4() + this.s4() + this.s4() + this.s4() + this.s4() + this.s4() + this.s4() + this.s4()
  }
  //tim index theo id
  findIndexById = (id) => {
    const { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }
  onDelete = (id) => {
    const { tasks } = this.state;
    let index = tasks.find(task => Object.is(id, task.id));
    let itemDelete = index.id;
    // let infoUser = users.find(user => Object.is(username.toString(), user.username.toString()));

    if (itemDelete !== -1) {
      tasks.splice(itemDelete, 1);
      this.setState({
        tasks: tasks,
        isDisplayForm: false
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

  }
  onUpdate = (id) => {
    const { tasks } = this.state;
    const index = this.findIndexById(id);
    const taskEditing = tasks[index];
    console.log(taskEditing);
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    console.log(filterName, '-', filterStatus);
    filterStatus = +filterStatus;
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }

    })
  }
  onSearch = (keyword) => {
    // console.log(keyword);
    this.setState({
      keyword: keyword
    });
  }
  onSort = (sortBy, sortValue) => {
    // console.log(sortBy, sortValue);
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
  }
  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state;
    /////filter
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter(task => {
        if (filter.status === -1) {
          return task;
        }
        else {
          return task.status === filter.status;
        }
      });
    }
    /////search
    if (keyword) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    // console.log(filter);
    //sort
    if (sortBy === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    }
    // else {
    //   tasks.sort((a, b) => {
    //     if (a.status > b.status) return sortValue;
    //     else if (a.status < b.status) return -sortValue;
    //     else return 0;
    //   });
    // }
    const elmTaskForm = isDisplayForm ? <TaskForm
      onSubmit={this.onSubmit}
      onCloseForm={this.onCloseForm}
      taskUpdate={taskEditing}
    /> : '';
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 mt-3 mb-3 text-sm-center mx-auto">
              <h2>HRM MANAGER</h2>
            </div>
          </div>
          <div className="row">
            {elmTaskForm}
            <div className="col">
              <button onClick={this._ToggleNewTask} className="btn btn-success mb-2 float-left">Add new Job <i className="fa fa-plus ml-1 mr-1"></i></button>
              <SearchSort onSearch={this.onSearch} onSort={this.onSort}
                sortBy={sortBy}
                sortValue={sortValue}
              />
              <div className="tabledata">
                <TaskListTable
                  tasks={tasks}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;