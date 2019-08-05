import React, { Component } from 'react';

class TaskListItem extends Component {

    lable = () => {
        const { item } = this.props;
        if (item.status === 1)
            return "btn btn-sm btn-success";
        if (item.status === 2)
            return "btn btn-sm btn-info";
        if (item.status === 3)
            return "btn btn-sm btn-warning";
    }
    statusItem = () => {
        const { item } = this.props;
        if (item.status === 1)
            return "Finish";
        if (item.status === 2)
            return "Ongoing";
        if (item.status === 3)
            return "Unmake";
    }
    
    onDelete = () => {
        this.props.onDelete(this.props.item.id);

    }
    onUpdate = () => {
        this.props.onUpdate(this.props.item.id);

    }
    render() {
        const { item, index } = this.props;
        item.status = +item.status
        return (
            <>
                <tr>
                    <td>{index + 1} </td>
                    <td>{item.name}</td>
                    <td >
                        <span className={this.lable()} > {this.statusItem()} </span>

                    </td>
                    <td>
                        <div className="btn-group">
                            <button 
                                className="btn btn-sm btn-warning"
                                onClick={ this.onUpdate}
                            ><i className="fa fa-pencil"></i></button>
                            <button 
                                className="btn btn-sm btn-danger"
                                onClick={this.onDelete}
                                ><i className="fa fa-remove"></i></button>
                        </div>

                    </td>
                </tr>
            </>
        );
    }
}

export default TaskListItem;