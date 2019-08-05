import React, { Component } from 'react';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    _handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
    }
    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }
    render() {
        const { keyword } = this.state;
        return (
            <>
                <div className="form-inline my-2 my-lg-0">
                    <input 
                        className="form-control mr-sm-2" type="search" 
                        placeholder="Search" aria-label="Search" 
                        name="keyword"
                        value={keyword}
                        onChange={ this._handleChange }
                    />
                    <button 
                        className="btn btn-outline-info my-2 my-sm-0" type="submit"
                        onClick={ this.onSearch }
                    >Search</button>
                </div>
            </>
        );
    }
}

export default Search;