import React, { Component } from 'react';

class Sort extends Component {
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        
    }
    sortName = (sortBy, sortValue) => {;
        this.props.onSort(sortBy, sortValue);
    }
    render() {
        const { sortBy, sortValue } = this.props;
        return (
            <>
                <div className="dropdown float-left mr-1 ml-1">
                    <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenu2"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort
                        </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button
                            className={ (sortBy === 'name' && sortValue === 1) ? 'dropdown-item fa fa-check mr-2' : 'dropdown-item'} type="button"
                            onClick={() => this.sortName('name', 1)}
                        > Name to <i className="fa fa-sort-alpha-asc"></i></button>
                        <button
                            className={ (sortBy === 'name' && sortValue === -1) ? 'dropdown-item fa fa-check mr-2' : 'dropdown-item'}  type="button"
                            onClick={() => this.sortName('name', -1)}
                        > Name to <i className="fa fa-sort-alpha-desc"></i></button>
                        {/* <hr /> */}
                        {/* <button onClick={() => this.sortName('status', 1)} className={ (sortBy === 'status' && sortValue === 1) ? 'dropdown-item fa fa-check mr-2' : 'dropdown-item'}  type="button">Finish</button>
                        <button onClick={() => this.sortName('status', 2)} className={ (sortBy === 'status' && sortValue === 2) ? 'dropdown-item fa fa-check mr-2' : 'dropdown-item'}  type="button">Ongoing</button>
                        <button onClick={() => this.sortName('status', -1)} className={ (sortBy === 'status' && sortValue === 3) ? 'dropdown-item fa fa-check mr-2' : 'dropdown-item'}  type="button">Unmake</button> */}
                    </div>
                </div>
            </>
        );
    }
}

export default Sort;