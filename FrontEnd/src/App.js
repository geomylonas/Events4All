
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Routes, Route } from 'react-router-dom';
import CategoryComponent from './pages/categories/Components/CategoriesList';
import AllCategories from './pages/categories/views/AllCategories';
import Homepage from './pages/homepage/homepage';
import {React, useLayoutEffect, useState} from 'react';
import { useMediaQuery} from 'react-responsive';
import EventsComponent from './pages/events/MainPage';
import EventInfo from './pages/events/EventInfo';
import FeaturedEvents from './pages/events/MainPage';
import CreateNewEvent from './pages/events/CreateNewEvent';
import ContactUs from './pages/contact/contactUs';
import FooterDiv from './components/Footer/Footer';
import UpButton from './components/UpButton/UpButton';


function App() {

  return (
    <div className="customContainer">
      <NavigationBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events/mainpage" element={<FeaturedEvents />} />
          <Route path="/events/info/:id" element={<EventInfo />} />
          <Route path="/createnewevent" element={<CreateNewEvent />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <UpButton />
        <FooterDiv/>      
    </div>
  );
}

export default App;
