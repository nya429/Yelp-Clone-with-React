import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from  './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';
/*
const business = {
  imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
  name: 'MarginOtto Pizzeria',
  address: '1010 Paddington Way',
  city: 'Flavortown',
  state: 'NY',
  zipCode: '10101',
  category: 'Italian',
  rating: 4.5,
  reviewCount: 90
};

*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business:[],
    };
    this.searchYelp = this.searchYelp.bind(this).then(busienss => this.setState());
  }

  searchYelp(term,location,sortBy) {
    Yelp.searchYelp(term,location,sortBy).then(busienss => {   //why then
      this.setState({
        businesses:busienss
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp = {this.searchYelp}/>    //bind two times
        <BusinessList business={this.state.businesses} />
      </div>
    );
  }
}

export default App;
