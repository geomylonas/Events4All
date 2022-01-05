import classes from "./UpButton.module.css";
import React, { useState} from 'react';
import { Button } from "react-bootstrap";

export default function UpButton(){

    const [visible, setVisible] = useState(false)
  
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300){
        setVisible(true)
      } 
      else if (scrolled <= 300){
        setVisible(false)
      }
    };
    
    const scrollToTop = () =>{
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      });
    };
    
    window.addEventListener('scroll', toggleVisible);
    
    return (
        <div className={classes.UpButton}>
       <img src={require("../../images/up1.png")} onClick={scrollToTop} 
          style={{display: visible ? 'inline' : 'none'}} />
      </div>
      
    );
  }
    
    
  
