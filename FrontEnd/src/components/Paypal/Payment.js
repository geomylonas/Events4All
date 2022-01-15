
import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom"
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });




export default function Payment(props) {
  const {product} = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  const handleApprove = (orderId) =>{
    console.log(orderId);
    setPaidFor(true)
    console.log("done");

  }


  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${product.reduce((c, p) => c + (p.count*p.ticketPrice), 0)}`,
          },
        },
      ],
    });
  };
  
  if(paidFor){
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify([]));
    window.location.reload();
    navigate("/successpayment")
  }
  
  if(error){
    alert(error)
  }

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    console.log("order", order)

    handleApprove(data.orderID)
  };
  return (
      <div id="payment">
        
    <PayPalButton
      
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onCancel={()=>
      alert("payment Canceled")}
      onError={(error)=>{setError(error); console.log("errorrrr", error)}}
      />
      </div>
  );
}
