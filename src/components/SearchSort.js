import React, { Component } from 'react';
import Sort from './Sort';
import Search from './Search';

class SearchSort extends Component {
    render() {
        return (
            <>
                <div className="float-right">
                    <Sort onSort={ this.props.onSort }
                        sortBy={ this.props.sortBy }
                        sortValue={ this.props.sortValue }
                    />
                    <Search onSearch={ this.props.onSearch }/>
                </div>
            </>
        );
    }
}

export default SearchSort;