
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Routes, Route } from 'react-router-dom';
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
      cartItems: [],
    }
  }
  addToCart = (p) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart;
    
    cartItems.map(item => {
      if(item.eventId == p.eventId && item.ticketCategory == p.ticketCategory){
        item.count++
        alreadyInCart=true;
      }
    });
    if(p.ticketPrice == 0){
      console.log(p.ticketPrice)
      alreadyInCart=true;
    }
    if(!alreadyInCart){
      cartItems.push({...p, count: 1});
    } 
    this.setState({cartItems})
  }

  addQuantity = (p) => {
    var num = ++p.count
      this.setState({num})  
  }

  subtractQuantity = (p) => {
    if(p.count>1){
      var num = --p.count
      this.setState({num})  
    }
    
  }


  emptyCart = () =>{
    this.setState({cartItems: []})
    console.log("hohoho")
  }
  
  render() {
    const attributes = {
      chosenproducts: this.state.cartItems,
      emptycart: this.emptyCart,
      addquantity: this.addQuantity,
      subtractquantity: this.subtractQuantity
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
