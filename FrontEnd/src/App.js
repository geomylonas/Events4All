import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import { Component } from "react";
import { useMediaQuery } from "react-responsive";
import EventsComponent from "./pages/events/MainPage";
import EventInfo from "./pages/events/EventInfo";
import FeaturedEvents from "./pages/events/MainPage";
import CreateNewEvent from "./pages/events/CreateNewEvent";
import ContactUs from "./pages/contact/contactUs";
import FooterDiv from "./components/Footer/Footer";
import UpButton from "./components/UpButton/UpButton";
import Cart from "./components/Cart/Cart";
import RegisterPage from "./pages/register/Register";
import OrganizerEvents from "./pages/events/EventsByOrganizer/OrganizerEvents";
import ReactDatePicker from "react-datepicker";
import OrganizerEventInfo from "./pages/events/EventsByOrganizer/EventInfoOrganizer";
import React from "react";
import Payment from "./components/Paypal/Payment";
import { stringify } from "qs";
import EditEvent from "./pages/events/EventsByOrganizer/EditEvent";
import SuccessPayment from "./components/Paypal/SuccessPayment";
import axios from "axios";
import { Redirect } from "react-router";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Purchases from "./pages/purchases/Purchases";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cart")),
      userRole: "",
      product: [],
    };
  }

  addToCart = (p) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart;

    cartItems.map((item) => {
      if (
        item.eventId == p.eventId &&
        item.ticketCategory == p.ticketCategory
      ) {
        if (p.availableTickets > item.count) {
          item.count++;
        } else {
          alert("There are no more Available Tickets!");
        }
        alreadyInCart = true;
      }
    });
    if (p.ticketPrice == 0) {
      alreadyInCart = true;
    }
    if (!alreadyInCart) {
      cartItems.push({ ...p, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  addQuantity = (p) => {
    if (p.availableTickets > p.count) {
      ++p.count;
      console.log(p.count);
      let cartStorage = JSON.parse(localStorage.getItem("cart"));
      cartStorage.map((pr) => {
        console.log(pr);
        if (p.eventId == pr.eventId && p.ticketCategory == pr.ticketCategory) {
          pr.count = p.count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartStorage));
      this.setState({ cartItems: JSON.parse(localStorage.getItem("cart")) });
    } else {
      alert("There are no more Available Tickets!");
    }
  };

  subtractQuantity = (p) => {
    if (p.count > 1 && p.count) {
      --p.count;
      console.log(p.count);
      let cartStorage = JSON.parse(localStorage.getItem("cart"));
      cartStorage.map((pr) => {
        console.log(pr + "ff");
        if (p.eventId == pr.eventId && p.ticketCategory == pr.ticketCategory) {
          pr.count = p.count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartStorage));
      this.setState({ cartItems: JSON.parse(localStorage.getItem("cart")) });
    }
  };

  removeProduct = (p) => {
    this.state.cartItems.splice(this.state.cartItems.indexOf(p), 1);
    this.setState({ cartItems: this.state.cartItems });
    localStorage.setItem("cart", JSON.stringify(this.state.cartItems));
  };

  emptyCart = () => {
    this.setState({ cartItems: [] });
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify([]));
  };

  proceedToPayment = (p) => {
    this.setState({ product: p });
    console.log(this.state.product);
    let PurchaseDetails = [];
    let PurchaseDetail = {};
    p.map((pr) => {
      PurchaseDetail = {
        TotalPrice: pr.count * pr.ticketPrice,
        Quantity: pr.count,
        TicketId: pr.ticketId,
      };
      PurchaseDetails = [...PurchaseDetails, PurchaseDetail];
    });
    let Purchase = {
      PurchaseDetails: PurchaseDetails,
      DateOfPurchase: new Date().toJSON().slice(0, 10),
      Amount: p.reduce((c, p) => c + p.count * p.ticketPrice, 0),
    };
    console.log(Purchase);
    const headers = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };

    axios
      .post("https://localhost:44359/api/purchases/check", Purchase, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/payment";
      })
      .catch((error) => {
        console.log(error);
        alert("This action cannot be done");
      });
  };

  render() {
    const attributes = {
      chosenproducts: this.state.cartItems,
      emptycart: this.emptyCart,
      addquantity: this.addQuantity,
      subtractquantity: this.subtractQuantity,
      removeproduct: this.removeProduct,
      proceedtopayment: this.proceedToPayment,
    };

    console.log();
    return (
      <div className="customContainer">
        <NavigationBar {...attributes} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/events/mainpage"
            element={<FeaturedEvents addToCart={this.addToCart} />}
          />
          <Route
            path="/events/info/:id"
            element={<EventInfo addToCart={this.addToCart} />}
          />
          {localStorage.getItem("userRole") == JSON.stringify("Organizer") && (
            <Route path="/createnewevent" element={<CreateNewEvent />} />
          )}
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<RegisterPage />} />
          {localStorage.getItem("userRole") == JSON.stringify("Organizer") && (
            <Route path="/myeventsorganizer" element={<OrganizerEvents />} />
          )}
          {localStorage.getItem("userRole") == JSON.stringify("Organizer") && (
            <Route
              path="/myeventsorganizer/info/:id"
              element={<OrganizerEventInfo />}
            />
          )}
          {localStorage.getItem("userRole") == JSON.stringify("Organizer") && (
            <Route path="/editevent/info/:id" element={<EditEvent />} />
          )}
          {localStorage.getItem("token") && (
            <Route
              path="/payment"
              element={
                <Payment product={JSON.parse(localStorage.getItem("cart"))} />
              }
            />
          )}
          {localStorage.getItem("token") && (
            <Route path="/successpayment" element={<SuccessPayment />} />
          )}
          {localStorage.getItem("token") && (
            <Route path="/mytickets" element={<Purchases />} />
          )}
        </Routes>
        <UpButton />
        <FooterDiv />
      </div>
    );
  }
}

export default App;
