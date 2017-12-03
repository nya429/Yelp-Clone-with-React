import React from 'react';
import './SearchBar.css';

const sortByOptions={
  "Best Match":"best_match",
  "Highest Rated":"rating",
  "Most Reviewed":"review_count"
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term:'',
      location:'',
      sortBy:'best_match'
    };
    this.sortByOptions = { 
       'Best Match':'best_match',
       'Highest Rated':'rating',
       'Most Reviewed':'review_count'
     };

     this.handleLocationChange = this.handleLocationChange.bind(this);
     this.handleTermChange = this.handleTermChange.bind(this);
     this.handleSearch = this.handleSearch.bind(this);

  }

   getSortByClass(sortByOption) {
    if(this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

  handleSortByChange(sortByOption) {
      this.setState({sortBy:sortByOption});
  }

  handleLocationChange(event) {
    this.setState({location:event.target.value});
  }

  handleTermChange(event) {
    this.setState({term:event.target.value});
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy);
    event.preventDefault();
  }

  renderSortOptions() {
      return Object.keys(sortByOptions).map(sortByOption => {
        let sortByOptionValue = this.sortByOptions[sortByOption];
          return (
                        <li onClick={this.handleSortByChange.bind(this,sortByOptionValue)}
                        className={this.getSortByClass(sortByOptionValue)}
                        key={sortByOptionValue}>{sortByOption}
                        </li>
                      );
      });
  }

  render() {
    return (  <div className="SearchBar">
                <div className="SearchBar-sort-options">
                  <ul>
                    {this.renderSortOptions()}
                  </ul>
                  </div>
                  <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} placeholder="Where?" />
                    </div>
                    <div className="SearchBar-submit">
                      <a onClick={this.handleSearch}>Let's Go</a>
                    </div>
                    </div>
                  );
                }
}

export default SearchBar;
