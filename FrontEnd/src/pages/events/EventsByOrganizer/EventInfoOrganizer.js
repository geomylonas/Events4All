import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from '../EventInfo.module.css';
import { Card } from "react-bootstrap";
import "./EventInfoOrganizer.css";


function OrganizerEventInfo(props) {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [cartModal, setCartModal] = useState(false);
    const [checked, setChecked] = useState(0);
    const [category, setCategory] = useState('')
    const [ticketId, setTicketId] = useState(0)
    const [disabled, setDisabled] = useState(true);



    useEffect(() => {
        fetchEvent();
    }, []);
    const fetchEvent = () => {
        if (id != null) {


            axios
                .get(
                    `https://localhost:44359/api/Events/?id=${id}`
                )
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
        const ticketId = p.Id
        const chosenCategory = p.Category.Name;
        setChecked(price);
        setCategory(chosenCategory);
        console.log(pr)
        setDisabled(false);
    }


    if (data.length == 0) return null;
    const selectedProduct = { eventId: data.Id, eventTitle: data.Title, ticketId: ticketId, ticketPrice: checked, ticketCategory: category }
    return (
        <div className={classes.eventSection} key={data.Id}>


            <div className={classes.col1}>
                <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.eventImage} />

                <div className="orgticketBox">
                    <h4>Tickets</h4>
                    <div className="orgcategorytickets">
                        <div>
                            <h6>Category</h6>
                            {data.Tickets.map(p => (

                                <div className={classes.categorydiv} key={p.Category.Name}>{p.Category.Name}</div>

                            ))}
                        </div>
                        <div>
                            <h6>Price</h6>
                            {data.Tickets.map(p => (

                                <div key={p.Category.Name} name={p.Price} className="price">{p.Price}</div>

                            ))}
                        </div>
                    </div>
                    {/* <button className={classes.filledButton} onClick={() => props.addToCart(selectedProduct)} disabled={disabled}>Add to Cart</button> */}

                </div>
            </div>





            <div className={classes.col2}>


                <h4>Event happening</h4>
                <Card body className={classes.eventBox}>{data.PlaceName}</Card>
                <h4>Address</h4>
                <Card body className={classes.eventBox}>{data.PlaceAddress}</Card>
                <h4>Description</h4>
                <Card body className={classes.eventBox}>{data.Description}</Card>
                <h4>Date Of Event</h4>
                <Card body className={classes.eventBox}>
                    {data.DateOfEvent}
                </Card>
            </div>



        </div>

    );
}




export default OrganizerEventInfo;









