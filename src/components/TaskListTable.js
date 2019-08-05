import React, { Component } from 'react';

import TaskListItem from './TaskListItem';
class TaskListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }
    _handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { filterName, filterStatus } = this.state;
        this.props.onFilter(
            name === 'filterName' ? value : filterName,
            name === 'filterStatus' ? value : filterStatus
        );
        this.setState({
            [name] : value 
        });
    }
    render() {
        const { tasks } = this.props;
        let { filterName, filterStatus } = this.state;
        const taskItem = tasks.map((item, index) => {
            return <TaskListItem
                key={item.id}
                index={index}
                item={item}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
            />
        })
        return (
            <>
                <table id="example" className="table table-striped table-bordered" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input 
                                    type="text" className="form-control" 
                                    id="inputEmail4" placeholder="Name" 
                                    name="filterName"
                                    value={ filterName }
                                    onChange={ this._handleChange }
                                    />
                            </td>
                            <td>
                                <select 
                                    id="inputState" className="form-control"
                                    name="filterStatus"
                                    value={ filterStatus }
                                    onChange={ this._handleChange }
                                >
                                    <option value={-1}>All</option>
                                    <option value={1}>Finish</option>
                                    <option value={2}>Ongoing</option>
                                    <option value={3}>Unmake</option>
                                </select>
                            </td>
                            <td>
                            </td>
                        </tr>
                        {taskItem}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </>
        );
    }
}

export default TaskListTable;