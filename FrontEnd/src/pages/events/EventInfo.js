import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from "./EventInfo.module.css";
import { Image, Card, ProgressBar, Carousel } from "react-bootstrap";
import Cart from "../../components/Cart/Cart";
import { propTypes } from "react";
import { Link } from "react-router-dom";
import GoogleMaps from "../../components/GoogleMap";

function EventInfo(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [cartModal, setCartModal] = useState(false);
  const [checked, setChecked] = useState(0);
  const [category, setCategory] = useState("");
  const [ticketId, setTicketId] = useState(0);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, []);
  const fetchEvent = () => {
    if (id != null) {
      axios
        .get(`https://localhost:44359/api/Events/?id=${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  function openCartModal() {
    setCartModal(true);
  }

  function onCloseCartModal() {
    setCartModal(false);
  }

  function handleChange(p) {
    const price = p.Price;
    const pr = p;
    const ticketId = p.Id;
    const chosenCategory = p.Category.Name;
    setChecked(price);
    setTicketId(p.Id);
    setCategory(chosenCategory);
    console.log(pr);
    setDisabled(false);
  }

  if (data.length == 0) return null;
  const selectedProduct = {
    eventId: data.Id,
    eventTitle: data.Title,
    ticketId: ticketId,
    ticketPrice: checked,
    ticketCategory: category,
    availableTickets: data.AvailableTickets,
  };
  return (
    <div className={classes.eventSection} key={data.Id}>
      <div className={classes.col1}>
      <Carousel style={{width: "100%"}} fade>
                {data.Pictures.map(i=>{
                    
                    return(
                        
                        <Carousel.Item >
                        <img key={i.Id + i.Url} src={require(`../../Files/${i.Url}`)} alt={`${i.Url}`} className="orgImg" />
                        </Carousel.Item>
                    )
                            
                })}
            </Carousel>

        <div className={classes.ticketBox}>
          <h4>Choose a Ticket</h4>
          <div className={classes.categorytickets}>
            <div>
              <h6>Category</h6>
              {data.Tickets.map((p) => (
                <div className={classes.categorydiv} key={p.Category.Name + p.Id}>
                  {p.Category.Name}
                </div>
              ))}
            </div>
            <div>
              <h6>Price</h6>
              {data.Tickets.map((p) => (
                <div key={p.Id + p.Category.Name}>
                  <input
                    type="radio"
                    name={p.Price}
                    id={p.Price}
                    checked={checked == p.Price}
                    onChange={() => handleChange(p)}
                  />
                  <label htmlFor={p.Price}>{p.Price}</label>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.eventinfobuttons}>
          {(data.DateOfEvent > new Date().toJSON().slice(0, 10) && (data.AvailableTickets > 0)) ? (
            localStorage.getItem("token") ? (
              <button
                className={classes.filledButton}
                onClick={() => props.addToCart(selectedProduct)}
                disabled={disabled}
              >
                Add to Cart
              </button>
            ) : (
              <Link to="/register">
                <button className={classes.filledButton}>Add To Cart</button>
              </Link>
            )
          ) : (
            <button className={classes.filledButton} disabled>Event Finished</button>
          )}
          </div>
        </div>
      </div>

      <div className={classes.col2}>
        <h4>Event happening</h4>
        <Card body className={classes.eventBox}>
          {data.PlaceName}
        </Card>
        <h4>Address</h4>
        <Card body className={classes.eventBox}>
          {data.PlaceAddress}
        </Card>
        <h4>Description</h4>
        <Card body className={classes.eventBox}>
          {data.Description}
        </Card>
        <h4>Date Of Event</h4>
        <Card body className={classes.eventBox}>
          {data.DateOfEvent.slice(0, 10)}
        </Card>
        <h4>Time Of Event</h4>
        <Card body className={classes.eventBox}>
          {data.DateOfEvent.slice(11, 16)}
        </Card>
        <h4>AvailableTickets</h4>
        <ProgressBar
          style={{ height: "30px", fontSize: "16px" }}
          now={data.AvailableTickets}
          label={`${data.AvailableTickets}`}
        />
        <GoogleMaps address={data.PlaceAddress} />
      </div>
    </div>
  );
}

export default EventInfo;
