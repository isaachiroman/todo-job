import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: 1
        }
    }
    NewTask = (event) => {
        const target = event.target;
        let value = target.value;
        const name = target.name;           
        this.setState({
            [name]: value
        })
        // this.setState({ [name] : (value) ? null : parseInt(value) }) 
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClearForm();
    }
    onCloseForm = () => {
        this.props.onCloseForm();
    }
    onClearForm = () => {
        this.setState({
            name: '',
            status: 1
        })
    }
    componentDidMount() {
        if (this.props.taskUpdate) {
            this.setState({
                id: this.props.taskUpdate.id,
                name: this.props.taskUpdate.name,
                status: this.props.taskUpdate.status
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.taskUpdate) {
            this.setState({
                id: nextProps.taskUpdate.id,
                name: nextProps.taskUpdate.name,
                status: nextProps.taskUpdate.status
            });
        }
        else if (!nextProps.taskUpdate) {
            this.setState({
                id: '',
                name: '',
                status: 1
            })
        }
    }
    render() {
        const { id } = this.state;
        return (
            <>
                <div className="col-sm-4 ">
                    <div className="card bg-light mb-3">
                        <div className="card-header">{id !== '' ? 'Update Job' : 'Add new job'}<button onClick={this.onCloseForm} className="btn btn-sm btn-danger fa fa-remove float-right"></button></div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-sm-12 text-left">
                                        <label htmlFor="inputEmail4">Name</label>
                                        <input
                                            name="name" type="text" className="form-control" id="inputEmail4" placeholder="Name"
                                            value={this.state.name}
                                            onChange={this.NewTask}
                                        />
                                    </div>
                                    <div className="form-group col-sm-12 text-left">
                                        <label htmlFor="inputState">Process</label>
                                        <select
                                            id="inputState" className="form-control" name="status"
                                            value={this.state.status}
                                            onChange={this.NewTask}
                                        >
                                            <option value={1}>Finish</option>
                                            <option value={2}>Ongoing</option>
                                            <option value={3}>Unmake</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success ml-1 mr-1">Save Job</button>
                                <button 
                                    type="reset" className="btn btn-danger ml-1 mr-1"
                                    onClick={this.onClearForm}
                                >Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default TaskForm;