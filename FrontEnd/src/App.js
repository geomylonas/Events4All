
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Routes, Route } from 'react-router-dom';
import CategoryComponent from './pages/categories/Components/CategoriesList';
import AllCategories from './pages/categories/views/AllCategories';
import Homepage from './pages/homepage/homepage';
import { Component, React, useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import EventsComponent from './pages/events/MainPage';
import EventInfo from './pages/events/EventInfo';
import FeaturedEvents from './pages/events/MainPage';
import CreateNewEvent from './pages/events/CreateNewEvent';
import ContactUs from './pages/contact/contactUs';
import FooterDiv from './components/Footer/Footer';
import UpButton from './components/UpButton/UpButton';
import Cart from './components/Cart/Cart';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cartItems: []
    }
  }
  addToCart = (p) => {
    this.setState({cartItems: [...this.state.cartItems, p]})
    console.log(this.state.cartItems);
  }

  emptyCart = () =>{
    this.setState({cartItems: []})
    console.log("hohoho")
  }
  
  render() {
    const attributes = {
      chosenproducts: this.state.cartItems,
      emptycart: this.emptyCart
    }
    return (
      <div className="customContainer">

        <NavigationBar {...attributes}/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events/mainpage" element={<FeaturedEvents addToCart={this.addToCart} />} />
          <Route path="/events/info/:id" element={<EventInfo addToCart={this.addToCart}/>} />
          <Route path="/createnewevent" element={<CreateNewEvent />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <UpButton />
        <FooterDiv />
      </div>
    );
  }
}

export default App;
