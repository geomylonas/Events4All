
import React from "react";
import ReactDOM from "react-dom"
import "./Payment.css";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


export default function Payment(props) {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${props.paypalamount}`,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture();
  };
  return (
      <div id="payment">
        
    <PayPalButton
      currency= "EUR"
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      />
      </div>
  );
}
